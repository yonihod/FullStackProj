const Address = require('../models/address');

module.exports = (app) => {
    app.route('/addresses')
        .get((req, res) => {
            Address.find().then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
        .post((req, res) => {
            Address.create(req.body).then((data) => {
                res.status(201).json(data);
            }).catch(err => {
                console.log(err);
            });
        });
};