let mongoose = require('mongoose');

// Publisher Schema

let publisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
});

let Publisher = module.exports = mongoose.model('Publisher',publisherSchema);