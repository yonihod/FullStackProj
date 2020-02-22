require('dotenv').config();

const {init} = require('./lib/express');
const port = process.env.PORT || 8000;
const app = init();

app.set('port', port);

app.listen(port, () => console.log(`Server listening on port ${port}!`));