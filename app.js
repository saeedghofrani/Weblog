const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const config = require('./config/config');
const { session: { sessionSecret } } = config;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const morgan = require('morgan');
require("./db/connection.db");
const app = express();
const appRouter = require('./routes/app.route.js');
app.use(morgan('tiny'));
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use(session({
    secret: sessionSecret,
    key: "user_sid",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000000
    }
}));
app.use('/', appRouter);
app.use((_req, _res, next) => { next(createError(404)); });
app.use((err, req, res, _next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 404);
    res.render('error', { error: { message: "page has gone missing", status: err.status || 404 } });
});
module.exports = app;