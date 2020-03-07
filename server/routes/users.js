const User = require('../models/user');

module.exports = (app) => {
    app.route('/users')
        .get((req, res) => {
            User.find().populate('skills').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
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

    app.route('/users/:email')
        .get((req, res) => {
            User.findOne({email: req.params.email}).populate('skills posts').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
        .put((req, res) => {
            User.findOneAndUpdate({email: req.params.email}, req.body, {
                new: true,
                upsert: true
            }).then(data => {
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
