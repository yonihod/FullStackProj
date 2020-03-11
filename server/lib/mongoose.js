const mongoose = require('mongoose');
const {fillDbWithPosts} = require('../services/stackoverflow');

module.exports.connect = () => {
    return mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true})
        .then(() => {
            console.log('Connected to mongo db');
            fillDbWithPosts();
        });
};