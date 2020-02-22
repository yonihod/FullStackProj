require('dotenv').config();

const { init } = require('./lib/express');
const port = process.env.PORT || 8001;
const app = init();

app.set('port', port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;