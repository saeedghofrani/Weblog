//express
const express = require('express');
const router = express.Router();

//Junction Box
const dashboardRouter = require('./dashboard.route.js');
const homeRouter = require('./home.route.js');
const articlesRouter = require('./articles.route.js');
const contactRouter = require('./contact.route.js');
const authRouter = require('./auth.route.js');
const adminRouter = require('./admin.route.js');
const abouteRouter = require('./about.route.js');

//route and address
router.use('/auth', authRouter);
router.use('/dashboard', dashboardRouter);
router.use('/home', homeRouter);
router.use('/articles', articlesRouter);
router.use('/contact', contactRouter);
router.use('/admin', adminRouter);
router.use('/about', abouteRouter);

module.exports = router;