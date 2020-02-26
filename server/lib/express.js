const express = require('express');
const path = require('path');
const glob = require('glob');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

function initViewEngine(app) {
    // view engine setup
    app.set('views', path.resolve('views'));
    app.set('view engine', 'jade');
}

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

        await skill.deleteMany();
        await user.deleteMany();

        const insertedSkills = await skill.insertMany([{name: 'web developer'}, {name: 'ios developer'}, {name: 'designer'}]);
        const skillsIds = insertedSkills.map(x => x._id);

        await user.insertMany([
            {name: 'Chen1', email: 'Chen1@gmail.com', skills: skillsIds},
            {name: 'Chen2', email: 'Chen2@gmail.com'}
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

    initViewEngine(app);
    initAppMiddleware(app);
    initServerRoutes(app);
    initErrorHandling(app);

    // temporary for tests
    initSeedData().then(() => {
        console.log("we have seed data")
    });

    return app;
}

module.exports = {
    init
};