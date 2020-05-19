const Room = require('../models/room');

module.exports = (app) => {
    app.route('/rooms')
        .get((req, res) => {
            Room.find().populate('messages').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
        .post((req, res) => {
            Room.create(req.body).then((data) => {
                res.status(201).json(data);
            }).catch(err => {
                console.log(err);
            });
        });

    app.route('/rooms/:id')
        .get((req, res) => {
            Room.findById(req.params.id).populate('messages').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
        .put((req, res) => {
            Room.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                upsert: true
            }).then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
            });
        })
        .delete((req, res) => {
            Room.findByIdAndRemove(req.params.id).then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
            });
        });

    app.route('/rooms/list/:user_id')
        // TODO: filter by user id
        .get((req, res) => {
            Room.find().populate('messages').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
};