const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

let messageSchema = mongoose.Schema({
    sender: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    text: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Message', messageSchema);