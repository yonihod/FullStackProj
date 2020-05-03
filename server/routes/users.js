const User = require('../models/user');

function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}

async function getUsers(filter) {
    let users;
    if (filter['skills']) {
        let skillsFilter = {$regex: filter['skills'], $options: 'i'};
        delete filter.skills;
        users = await User.find(filter).populate({
            path: 'skills',
            match: {name: skillsFilter}
        });
        users = users.filter(function (user) {
            return user.skills.length;
        })
    } else {
        users = await User.find(filter).populate('skills');
    }

    return users;
}

module.exports = (app) => {
    app.route('/users')
        .get(async (req, res) => {
            let filter = {};
            if (typeof req.query.filter !== 'undefined' && !isEmpty(req.query.filter)) {
                filter = JSON.parse(req.query.filter);
            }
            const users = await getUsers(filter);
            res.status(200).send(users);
        })
        .post((req, res) => {
            User.create(req.body).then((data) => {
                res.status(201).json(data);
            }).catch(err => {
                console.log(err);
            });
        });

    app.route('/users/:id')
        .get((req, res) => {
            User.findById(req.params.id).populate('skills posts').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
        .put((req, res) => {
            User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                upsert: true
            }).then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
            });
        })
        .delete((req, res) => {
            User.findByIdAndRemove(req.params.id).then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
            });
        });

    app.route('/users/email/:email')
        .get((req, res) => {
            User.findOne({email: req.params.email}).populate('skills posts').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log("server " + err);
            });
        })
        .put((req, res) => {
            User.findOneAndUpdate({email: req.params.email}, req.body, {
                new: true,
                upsert: true
            }).populate('skills posts').then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
            });
        })
        .delete((req, res) => {
            User.findOneAndRemove({email: req.params.email}).then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
            });
        })
};
