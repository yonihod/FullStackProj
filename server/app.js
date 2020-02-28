require('dotenv').config();

const {init} = require('./lib/express');
const {connect} = require('./lib/mongoose');

const port = process.env.PORT || 8000;

connect().then(() => {
    const app = init();
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
}).catch((err) => {
    console.log(err);
});