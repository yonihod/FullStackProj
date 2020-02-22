module.exports = (app) => {
    app.route('/users')
        .get((req, res) => {
            res.json({
                name: 'user',
                password: 'password'
            })
        });
};
