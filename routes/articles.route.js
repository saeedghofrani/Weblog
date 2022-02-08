"use strict";
//express
const express = require('express');
const router = express.Router();
// controller
const { articles, article, myArticle, addArticlePage, addArticleProcess } = require('../controller/articles.controller.js');
//multer middleware
const upload = require('../utils/multerInitializer.utils');
// session middleware
const sessionsCheck = require("../middleware/sessionCheck.middleware");


router.route('/')
    .get(articles);

router.route('/setup')
    .get(sessionsCheck.login, addArticlePage)
    .post(sessionsCheck.login, upload.single('articlePicture'), addArticleProcess);

router.route('/myArticle')
    .get(sessionsCheck.login, myArticle);

router.route('/:id')
    .get(article);

module.exports = router;