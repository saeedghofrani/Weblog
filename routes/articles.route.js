"use strict";
//express
const express = require('express');
const router = express.Router();
// controller
const { articles, addArticlePage, addArticleProcess, delMyArticle, updateArticleProcess, updateArticlePage, favorit } = require('../controller/articles.controller.js');
//multer middleware
const upload = require('../utils/multerInitializer.utils').uploadarticlePicture;
// session middleware
const sessionsCheck = require("../middleware/sessionCheck.middleware");

const articleValidation = require('../middleware/articleValidation.middleware.js');

router.route('/setup')
    .get(sessionsCheck.login, addArticlePage)
    .post(sessionsCheck.login, upload.single('articlePicture'), articleValidation('create'), addArticleProcess)
    .delete(sessionsCheck.login, delMyArticle);


router.route('/updateArticle/:id')
    .get(sessionsCheck.login, updateArticlePage)
    .post(sessionsCheck.login, upload.single('articlePicture'), articleValidation('update'), updateArticleProcess);


router.route('/favorit/:id')
    .post(favorit);

/**
 ** get all article (condition = all);
 ** get user articles (condition = myArticle);
 ** get article page (condition = article id);
 */
router.route('/:condition')
    .get(articles);

module.exports = router;    