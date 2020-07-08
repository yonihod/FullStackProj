const Skill = require('../models/skill');
const User = require('../models/user');

module.exports = (app) => {
    app.route('/skills')
        .get((req, res) => {
            Skill.find().then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err)
            });
        })
        .put((req, res) => {
            const id = req.body.userId;
            const skills = req.body.skills;

            User.findOneAndUpdate(
                { _id: id },
                { $set: { skills: skills } })
                .then((data) => {
                    res.status(201).json(data);
                }).catch((err) => {
                    console.log(err)
                });
        })
};