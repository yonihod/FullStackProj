var Twit = require('twit');

var T = new Twit({
    consumer_key:         'a2MbBIHUN4BvlgTRgIJRw6rj2',
    consumer_secret:      'YLhW7Y5pX7LjfNaOOsM8J1w1Jl3qfAccoRHHuCeNRBkj2IXtCE',
    access_token:         '1235389049264893959-rKzhUthPLLzS5aHYLIXqeu9nCf7faB',
    access_token_secret:  'ZtdGtlyDSEDjnQJrwDjvBqq41X8sixdJSncUPOn8JN6hd',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

module.exports = (app) => {
    app.route('/twitter')
        .post((req, res) => {
            T.post('statuses/update', { status: req.body.title }, function(err, data, response) {
                console.log(data)
            }).catch((err)=>{
               console.log(err);
            });
        });
};