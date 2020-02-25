const Publisher = require('../models/publisher');

module.exports = (app) => {
    app.route('/publishers')
        .get((req, res) => {
            Publisher.find().then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err)
            });

        })
        .post((req, res) => {

        });

    app.route('/publishers/:id')
        .get((req, res) => {

        })
        .put((req, res) => {

        })
        .delete((req, res) => {

        })
};