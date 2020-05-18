const Post = require('../models/post');

module.exports = (app) => {
    app.route('/commonTags')
        .get((req, res) => {
            Post.find({})
                .then(posts => {
                    // filter posts with no tags and create object with all the tags and their count
                    const tagsWithCount = posts.filter(p => p.tags.length > 0).flatMap(p => p.tags)
                        .reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));

                    // map the object to array
                    var array = Object.keys(tagsWithCount).map(function (key) {
                        return [(key), tagsWithCount[key]];
                    });

                    // sort and take first 10
                    const sorted = array.sort((x, y) => y[1] - x[1]).slice(0, 10)

                    // map to match the chart data template
                    const mapped = sorted.map(function (x) {
                        return {
                            x: x[0],
                            y: x[1]
                        };
                    });

                    // final data
                    const data = {
                        key: 'Most Common Posts Tags', values: mapped
                    };

                    res.status(201).json(data);
                }).catch((err) => {
                console.log(err);
            });
        });

    app.route('/activeUsersPosts')
        .get((req, res) => {
            const data = Post.aggregate([
                    {
                        // make sure that the post has owner property
                        $match: {
                            "owner": {
                                "$exists": true,
                                "$ne": null
                            },
                            "owner.name": {
                                "$ne": 'System'
                            }
                        }
                    },
                    {
                        // populate owner from users
                        $lookup:
                            {
                                from: 'users',
                                localField: 'owner',
                                foreignField: '_id',
                                as: 'owner'
                            }
                    },
                    {
                        $unwind: '$owner'
                    },
                    {
                        // group the post by user
                        $group: {
                            _id: {'owner': "$owner"},
                            count: {$sum: 1}
                        }
                    },
                    {
                        // sort in descending order
                        $sort: {count: -1}
                    },
                    {
                        // take first 6 (5 + System user)
                        $limit: 6
                    }
                ]
            ).exec().then(users => {
                const data = users.filter(user => user._id.owner.name !== 'System')
                    .map(function (user) {
                        return {
                            label: user._id.owner.name,
                            value: user.count
                        }
                    });

                res.status(201).json(data);
            }).catch((err) => {
                console.log(err);
            });
        });
};