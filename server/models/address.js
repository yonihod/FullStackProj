const mongoose = require('mongoose');

const addressesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        // required: true
    }
})

module.exports = mongoose.model('Address', addressesSchema);