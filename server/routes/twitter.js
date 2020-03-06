const Twit = require('twit');
const config = require('../config');
const T = new Twit(config);

module.exports = (app) => {
    app.route('/twitter')
        .post((req, res) => {
            T.post('statuses/update', {status: req.body.title}, function (err, data, response) {
                console.log(data)
            }).catch((err) => {
                console.log(err);
            });
        });
};