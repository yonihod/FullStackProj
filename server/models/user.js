const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    skills: [{
        type: ObjectId,
        ref: 'Skill'
    }],
    posts: [{
        type: ObjectId,
        ref: 'Post'
    }]
});

module.exports = mongoose.model('User', userSchema);