const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const roomSchema = mongoose.Schema({
    users: [{
        type: ObjectId,
        ref: 'User'
    }],
    messages: [{
      type: Array
    }],
    post: {
        type: ObjectId,
        ref: 'Post'
    }
});

module.exports = mongoose.model('Room', roomSchema);