require('dotenv').config();

const {connect} = require('./lib/mongoose');
const {initApp} = require('./lib/express');
const {initSocket} = require('./lib/socketio');

const port = process.env.PORT || 8000;

connect().then(() => {
    const app = initApp();
    initSocket(app);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
}).catch((err) => {
    console.log(err);
});