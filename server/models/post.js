const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

let postSchema = mongoose.Schema({
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
        type: Date,
        required: true,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    appliedUsers: [{
        type: ObjectId,
        ref: 'User'
    }],
    assignedUser: {
        type: ObjectId,
        ref: 'User',
        required: false
    },
    post_status: {
        type: String,
        enum: ['PRIVATE', 'ACTIVE', 'ASSIGNED', 'EXPIRED'],
        default: function() {
            if (postSchema.assignedUser == null)
                return 'ACTIVE';
            else
                return 'ASSIGNED';
        },
        required: true
    }

});

module.exports = mongoose.model('Post', postSchema);