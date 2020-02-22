const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const usersRouter = require('../routes/users');
const publishersRouter = require('../routes/publishers')
const indexRouter = require('../routes/index');

function initServerRoutes(app) {
    indexRouter(app);
    publishersRouter(app);
    usersRouter(app);
}

function initAppMiddlewares(app) {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.resolve('public')));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
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

function initViewEngine(app) {
    // view engine setup
    app.set('views', path.resolve('views'));
    app.set('view engine', 'jade');
}

function initDatabase(app) {
    const mongoose = require("./mongoose")
}

function init() {
    const app = express();
    initDatabase(app);
    initViewEngine(app);
    initAppMiddlewares(app);
    initServerRoutes(app);
    initErrorHandling(app);

    return app;
}

module.exports.init = init;