"use strict";
//express
const express = require('express');
const router = express.Router();
// controller
const { articles, article, myArticle, addArticlePage, addArticleProcess, delMyArticle, updateArticleProcess, updateArticlePage } = require('../controller/articles.controller.js');
//multer middleware
const upload = require('../utils/multerInitializer.utils').uploadarticlePicture;
// session middleware
const sessionsCheck = require("../middleware/sessionCheck.middleware");

//get all article
router.route('/')
    .get(articles);

// get users articles
router.route('/myArticle')
    .get(sessionsCheck.login, myArticle)

router.route('/updateArticle/:id')
    .get(sessionsCheck.login, updateArticlePage);

router.route('/setup')
    .get(sessionsCheck.login, addArticlePage)
    .post(sessionsCheck.login, upload.single('articlePicture'), addArticleProcess)
    .patch(sessionsCheck.login, updateArticleProcess)
    .delete(sessionsCheck.login, delMyArticle);

//get one perticular article
router.route('/:id')
    .get(article);

module.exports = router;