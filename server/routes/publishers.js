const Publisher = require('../models/publisher');
module.exports = (app) => {
    app.route('/publishers').get( (req, res) => {
            Publisher.find({},function (err,publishers) {
                if(err){
                    console.log(err);
                }else {
                    return publishers;
                }
            })
        });
};