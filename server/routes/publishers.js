module.exports = (app) => {
    app.route('/publishers')
        .get((req, res) => {
            res.json([
                { id: 1, name: 'Chen', email: 'chen@gmail.com', rollno: 123},
                {id: 2, name: 'Yoni',email: 'yoni@gmail.com',rollno: 12345},
                {id: 2, name: 'Yoni2',email: 'yoni2@gmail.com',rollno: 123454545}
            ])
        });
};