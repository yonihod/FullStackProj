module.exports = (app) => {
    app.route('/publishers')
        .get((req, res) => {
            res.json([{
                id: 1,
                name: 'Chen'
            }, {
                id: 2,
                name: 'Dor'
            }])
        });
};