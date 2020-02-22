const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fullStack');
let db = mongoose.connection;

db.once('open',()=> {
    console.log('Connected to Mongodb')
})

// check for db errors
db.on('error',() => {
    console.log('err');
});

