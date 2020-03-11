const axios = require('axios');
const Post = require('../models/post');
const User = require('../models/user');

function getStackoverflowQuestions() {
    return axios.get('https://api.stackexchange.com/2.2/questions?order=desc&sort=votes&min=10&site=stackoverflow')
        .then(res => res.data)
        .catch(err => console.log(err));
}

module.exports.fillDbWithPosts = () => {
    getStackoverflowQuestions().then(async (data) => {
        try {
            const userData = {name: 'System', email: 'system@developi.com'};
            const user = await User.findOneAndUpdate({email: 'system@developi.com'}, userData, {
                new: true,
                upsert: true
            });

            const newPosts = data.items.map(d => {
                return {
                    title: d.title,
                    description: 'feature by stackoverflow',
                    createAt: new Date(),
                    tags: d.tags,
                    owner: user._id
                }
            });

            newPosts.forEach(async p => {
                await Post.findOneAndUpdate({title: p.title}, p, {
                    upsert: true
                });
            });
        } catch (err) {
            console.log(err);
        }
    }).catch(err => console.log(err))
};