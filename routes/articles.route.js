"use strict";
//express
const express = require('express');
const router = express.Router();
// controller
const { articles, addArticlePage, addArticleProcess, delMyArticle, updateArticleProcess, updateArticlePage, favorit } = require('../controller/articles.controller.js');
//multer middleware
const upload = require('../utils/multerInitializer.utils').uploadarticlePicture;
const checkAccess = require('../middleware/checkAccess.middleware');
// session middleware
const sessionsCheck = require("../middleware/sessionCheck.middleware");

const articleValidation = require('../middleware/articleValidation.middleware.js');

router.route('/setup')
    .get(sessionsCheck.login, addArticlePage)
    .post(sessionsCheck.login, upload.single('articlePicture'), articleValidation('create'), addArticleProcess)
    .delete(sessionsCheck.login, checkAccess.deleteArticle, delMyArticle);


router.route('/updateArticle/:id')
    .get(sessionsCheck.login, checkAccess.updateArticle, updateArticlePage)
    .post(sessionsCheck.login, checkAccess.updateArticle, upload.single('articlePicture'), articleValidation('update'), updateArticleProcess);


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