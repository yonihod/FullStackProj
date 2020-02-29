const Post = require('../models/post');

module.exports = (app) => {
    app.route('/posts')
        .get((req, res) => {
            Post.find().populate('owner').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
        .post((req, res) => {
            Post.create(req.body).then((data) => {
                res.status(201).json(data);
            }).catch(err => {
                console.log(err);
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
            Post.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                upsert: true
            }).then(data => {
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