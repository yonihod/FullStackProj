const Publisher = require('../models/publisher');
module.exports = (app) => {
    app.route('/publishers').get( (req, res) => {
            Publisher.find({})
                .exec()
                .then((data)=> {
                    res.status(200).json(data)
                })
                .catch(err=>console.log(err))
            })
};