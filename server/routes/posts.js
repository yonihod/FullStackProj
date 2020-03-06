const Post = require('../models/post');
const {io} = require('../lib/socketio');
const natural = require('natural');

function classify(title) {
    return new Promise((resolve, reject) => {
        natural.BayesClassifier.load('machine-learning/classifier.json', null, function (err, classifier) {
            let data = classifier.getClassifications(title.toLowerCase())
                .filter(x => /*x.value > 0.0001 &&*/ x.label !== '') // filter blank tags and option to receive tags with a certain precision
                .sort((x, y) => y.value - x.value)
                .slice(0, 3);

            resolve(data);
        });
    });
}

module.exports = (app) => {
    app.route('/posts')
        .get((req, res) => {
            Post.find().populate('owner').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
        .post((req, res) => {
            classify(req.body.title).then(tags => {
                req.body.tags = tags.map(x => x.label);

                Post.create(req.body).then((data) => {
                    io().emit('newPost', data);
                    res.status(201).json(data);
                }).catch(err => {
                    console.log(err);
                });
            });
        });

    app.route('/posts/:id')
        .get((req, res) => {
            Post.findById(req.params.id).populate('owner').then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
            });
        })
        .put((req, res) => {
            Post.findByIdAndUpdate({_id: req.params.id}, req.body, {
                new: true,
                upsert: true
            }).populate("owner").then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
            });
        })
        .delete((req, res) => {
            Post.findByIdAndRemove(req.params.id).then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err);
            });
        })
};