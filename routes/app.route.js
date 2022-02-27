//express
const express = require('express');
const router = express.Router();

//Junction Box
const dashboardRouter = require('./dashboard.route.js');
const articlesRouter = require('./articles.route.js');
const authRouter = require('./auth.route.js');
const adminRouter = require('./admin.route.js');
const commentRouter = require('./comment.route.js');
const exposeRouter = require('./expose.route.js');

//route and address
router.use('/', exposeRouter);
router.use('/auth', authRouter);
router.use('/dashboard', dashboardRouter);
router.use('/articles', articlesRouter);
router.use('/admin', adminRouter);
router.use('/comment', commentRouter);

module.exports = router;