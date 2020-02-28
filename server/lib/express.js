const express = require('express');
const path = require('path');
const glob = require('glob');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');


function initAppMiddleware(app) {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.resolve('public')));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
}

function initServerRoutes(app) {
    for (const file of glob.sync(path.resolve('routes/*.js'))) {
        require(path.resolve(file))(app);
    }
}

async function initSeedData() {
    try {
        const user = require('../models/user');
        const skill = require('../models/skill');
        const post = require('../models/post');

        await skill.deleteMany();
        await user.deleteMany();
        await post.deleteMany();

        const insertedSkills = await skill.insertMany([{name: 'web developer'}, {name: 'ios developer'}, {name: 'designer'}]);
        const skillsIds = insertedSkills.map(x => x._id);

        await user.insertMany([
            {name: 'Chen1', email: 'Chen1@gmail.com', skills: skillsIds},
            {name: 'Chen2', email: 'Chen2@gmail.com'}
        ]);
        await post.insertMany([
            {title: 'How to detect that a screen is connected in cordova?',createdAt:Date.now,owner:'Kamil',
                description: 'I am trying to detect if a display/screen/tv is connected to my X96 mini device which running Android and if it is even turned on.' +'The mini device has an HDMI connection to Screen.\n' +'\n' + 'Any help or hints pls.'},
            {title: 'Failing at passing a host name variable to a role',createdAt:Date.now,owner:'Chen',
                description: 'I am trying to pass two variables that contain host names to a role. Those host names will be user as hosts: values.I tried like this. - hosts: host1,'},
            {title: 'How to detect that a screen is connected in cordova?',createdAt:Date.now,owner:'Or',
                description: 'I am trying to detect if a display/screen/tv is connected to my X96 mini device which running Android and if it is even turned on.' +'The mini device has an HDMI connection to Screen.\n' +'\n' + 'Any help or hints pls.'},
            {title: 'Best way to upload chunks one by one upto 1000 chunks using python',createdAt:Date.now,owner:'Alon',
                description: 'we need to upload a large file so we are splitting the large file into chunks for Example we have 1000 chunks uploaded in python backend . Any help would be appreciated'}
        ]);

    } catch (err) {
        console.log(err);
    }
}

function initErrorHandling(app) {
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}

function init() {
    const app = express();

    initAppMiddleware(app);
    initServerRoutes(app);
    initErrorHandling(app);

    // temporary for tests
    initSeedData().then(() => {
        console.log("Using Seed Data")
    });

    return app;
}

module.exports = {
    init
};