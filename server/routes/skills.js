const Skill = require('../models/skill');

module.exports = (app) => {
    app.route('/skills')
        .get((req, res) => {
            Skill.find().then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err)
            });
        })
};