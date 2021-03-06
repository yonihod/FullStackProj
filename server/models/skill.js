const mongoose = require('mongoose');

let skillSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    }
});

module.exports = mongoose.model('Skill', skillSchema);