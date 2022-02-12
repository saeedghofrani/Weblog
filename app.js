/**
 * Module dependencies.
 */
const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const favicon = require('serve-favicon');
const config = require('./config/config');
const { session: { sessionSecret } } = config;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const morgan = require('morgan');

/**
 * database connection
 */
require("./db/connection.db");

const app = express();

/**
 * require Junction Box
 */
const appRouter = require('./routes/app.route.js');

/**
 * logger
 */
app.use(morgan('tiny'));

/**
 * set up view --ejs
 */
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * logger option
 */
app.use(logger('dev'));

/**
 * express middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * express static assets
 */
app.use(express.static(join(__dirname, 'public')));

/**
 * set web icon
 */
app.use(favicon(join(__dirname, 'public', 'images', 'favicon.ico')));

/**
 * set up session
 */
app.use(session({
    secret: sessionSecret,
    key: "user_sid",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 60 * 100
    }
}));

/**
 * Junction Box
 */
app.use('/', appRouter);

/**
 * error handler
 */
app.use((_req, _res, next) => { next(createError(404)); });
app.use((err, req, res, _next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 404);
    res.render('error', { error: { message: "page has gone missing", status: err.status || 404 } });
});

// uncaught Exception handler
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION, APP SHUTTING DOWN NOW!!");
    console.log(err.message, err.name);
    res.render('error', { error: { message: "internall server error", status: 500 } });
    process.exit(1);
});

module.exports = app;
