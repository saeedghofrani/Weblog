/**
 * Module dependencies.
 */
const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const favicon = require('serve-favicon');
const config = require('./app/config/config');
const { session: { sessionSecret } } = config;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const morgan = require('morgan');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

/**
 * database connection
 */
require("./app/db/connection.db");

const app = express();

/**
 * require Junction Box
 */
const appRouter = require('./app/routes/app.route.js');

/**
 * logger
 */
app.use(morgan('tiny'));

/**
 * logger
 */
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));


/**
 * set up view --ejs
 */
app.set('views', join(__dirname, './views'));
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
app.use(express.static(join(process.cwd() , 'public')));

/**
 * set web icon
 */
app.use(favicon(join(process.cwd() , 'public', 'images', 'favicon.ico')));

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
    console.log(err);
    res.json({ path: "authentication", success: false, result: { error: "Path does not exist" } });

    // uncaught Exception handler
    process.on("uncaughtException", (err) => {
        console.log("UNCAUGHT EXCEPTION, APP SHUTTING DOWN NOW!!");
        console.log(err.message, err.name);
        console.log(err);
        res.json({ path: "authentication", success: false, result: { error: "Path does not exist" } });
        process.exit(1);
    });
});


module.exports = app;
