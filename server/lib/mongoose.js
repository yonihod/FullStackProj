const mongoose = require('mongoose');

module.exports.connect = () => {
    return mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true });
};