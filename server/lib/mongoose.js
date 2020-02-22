require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
let db = mongoose.connection;

db.once('open',()=> {
    console.log('Connected to Mongodb')
})

// check for db errors
db.on('error',() => {
    console.log('err');
});