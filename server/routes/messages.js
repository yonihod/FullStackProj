const Message = require('../models/message');
const {io} = require('../lib/socketio');

module.exports = (app) => {
    app.route('/messages')
        .get((req, res) => {
            Message.find().then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
        .post((req, res) => {
            Message.create(req.body).then((data) => {
                res.status(201).json(data);
                io().emit('newMessage', data);
            }).catch(err => {
                console.log(err);
            });
        });
};