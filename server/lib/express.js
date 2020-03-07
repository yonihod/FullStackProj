const express = require('express');
const path = require('path');
const http = require('http');
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
    app.use(express.static(path.resolve('public')));
    app.use(cookieParser());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
}

function initServerRoutes(app) {
    for (const file of glob.sync(path.resolve('routes/*.js'))) {
        require(path.resolve(file))(app);
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

function initApp() {
    const app = express();

    initAppMiddleware(app);
    initServerRoutes(app);
    initErrorHandling(app);

    return http.Server(app);
}

module.exports = {
    initApp
};