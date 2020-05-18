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
};