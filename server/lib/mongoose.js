const mongoose = require('mongoose');

module.exports.connect = () => {
    return mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true})
        .then(() => {
            console.log('Connected to mongo db');
            return initSeedData();
        });
};

async function initSeedData() {
    try {
        const post = require('../models/post');
        const user = require('../models/user');
        const skill = require('../models/skill');

        await skill.deleteMany();
        await user.deleteMany();
        await post.deleteMany();

        const insertedSkills = await skill.insertMany([{name: 'web developer'}, {name: 'ios developer'}, {name: 'designer'}]);
        const skillsIds = insertedSkills.map(x => x._id);

        const users = await user.insertMany([
            {name: 'Chen', email: 'Chen@gmail.com', skills: skillsIds},
            {name: 'Kamil', email: 'Kamil@gmail.com'},
            {name: 'Or', email: 'Or@gmail.com'},
            {name: 'Yoni', email: 'Yoni@gmail.com'},
            {name: 'Alon', email: 'Alon@gmail.com'}
        ]);
        await post.insertMany([
            {
                title: 'How to detect that a screen is connected in cordova?', owner: users[0]._id,
                description: 'I am trying to detect if a display/screen/tv is connected to my X96 mini device which running Android and if it is even turned on.' + 'The mini device has an HDMI connection to Screen.\n' + '\n' + 'Any help or hints pls.'
            },
            {
                title: 'Failing at passing a host name variable to a role', owner: users[1]._id,
                description: 'I am trying to pass two variables that contain host names to a role. Those host names will be user as hosts: values.I tried like this. - hosts: host1,'
            },
            {
                title: 'How to detect that a screen is connected in cordova?', owner: users[2]._id,
                description: 'I am trying to detect if a display/screen/tv is connected to my X96 mini device which running Android and if it is even turned on.' + 'The mini device has an HDMI connection to Screen.\n' + '\n' + 'Any help or hints pls.'
            },
            {
                title: 'Best way to upload chunks one by one upto 1000 chunks using python', owner: users[3]._id,
                description: 'we need to upload a large file so we are splitting the large file into chunks for Example we have 1000 chunks uploaded in python backend . Any help would be appreciated'
            },
            {
                title: 'Best way to upload chunks one by one upto 1000 chunks using python', owner: users[4]._id,
                description: 'we need to upload a large file so we are splitting the large file into chunks for Example we have 1000 chunks uploaded in python backend . Any help would be appreciated'
            }
        ]);

    } catch (err) {
        console.log(err);
    }
}