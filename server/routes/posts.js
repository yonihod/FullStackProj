const Post = require('../models/post');
const User = require('../models/user');
const {io} = require('../lib/socketio');
const natural = require('natural');

function classify(title) {
    return new Promise((resolve, reject) => {
        natural.BayesClassifier.load('machine-learning/classifier.json', null, function (err, classifier) {
            let data = classifier.getClassifications(title.toLowerCase())
                .filter(x => /*x.value > 0.0001 &&*/ x.label !== '') // filter blank tags and option to receive tags with a certain precision
                .sort((x, y) => y.value - x.value)
                .slice(0, 3);

            resolve(data);
        });
    });
}

function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}

module.exports = (app) => {
    app.route('/posts')
        .get((req, res) => {
            let filter = {};
            if(typeof  req.query.filter !== 'undefined' && !isEmpty(req.query.filter)){
                filter = JSON.parse(req.query.filter);
            }
            Post.find(filter).populate('owner').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
        .post((req, res) => {
            classify(req.body.title).then(tags => {
                req.body.tags = tags.map(x => x.label);

                Post.create(req.body).then((data) => {
                    //push created posts to his posts array
                    let postOwner = User.findById(req.body.owner).populate('posts').then( (postOwner) =>{
                        User.findOneAndUpdate({_id: postOwner._id},
                            {$push: {posts: data._id}},
                            {upsert : true},function (error,success) {
                            if(error){
                                console.log(error)
                            } else {
                                console.log(success)
                            }
                        });
                    });
                    io().emit('newPost', data);
                    res.status(201).json(data);
                }).catch(err => {
                    console.log(err);
                });
            });
        });

    app.route('/posts/:id')
        .get((req, res) => {
            Post.findById(req.params.id).populate('owner').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
        .put((req, res) => {
            Post.findByIdAndUpdate({_id: req.params.id}, req.body, {
                new: true,
                upsert: true
            }).populate("owner").then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
            });
        })
        .delete((req, res) => {
            Post.findByIdAndRemove(req.params.id).then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
            });
        })
};