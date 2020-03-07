module.exports = (app) => {
    app.route('/').get((req, res) => {
        res.redirect(process.env.CLIENT_URL);
    });
};