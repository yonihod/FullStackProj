const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let postSchema = Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: String,
        required: true,
        default: Date.now
    },
    dueDate: {
        type: String,
        required: false,
    },
    owner: {
        type: String,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);