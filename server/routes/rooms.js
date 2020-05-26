const mongoose = require('mongoose');
const Room = require('../models/room');
const User = require('../models/user');
const Message = require('../models/message');

module.exports = (app) => {
    app.route('/rooms')
        .get((req, res) => {
            Room.find().populate('messages').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
                res.status(500).json();
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
            Room.findById(req.params.id).populate('users messages').then((data) => {
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
    app.route('/rooms/new-message/:id')
        .put((req, res) => {
            console.log('new message received:' + req.params.id);
            //create new message
            Message.create({text:req.body.msg,sender:req.body.sender}).then( (res) =>{
                Room.findByIdAndUpdate(req.params.id, {$push: {messages: res._id}},{
                    upsert: true
                }).then(data => {
                    res.status(200).json(data);
                }).catch(err => {
                    console.log(err);
                });
            });

        });

    app.route('/rooms/list/:userEmail')
        .get(async (req, res) => {
            try {
                const {userEmail} = req.params;
                const user = await User.findOne({email: userEmail});
                const userRooms = await Room.find({users: user._id}).populate([{
                    path: 'messages',
                    populate: {
                        path: 'sender',
                        select: 'name email'
                    }
                }, {
                    path: 'users',
                    select: 'name email'
                }]);
                res.status(200).json(userRooms);
            } catch (e) {
                console.log(e);
                res.status(500).json({});
            }
        });
};