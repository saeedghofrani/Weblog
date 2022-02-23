"use strict";
//express
const express = require('express');
const router = express.Router();
// controller
const { articles, addArticlePage, addArticleProcess, delMyArticle, updateArticleProcess, updateArticlePage, comment, favorit, userComment, delUserComment } = require('../controller/articles.controller.js');
//multer middleware
const upload = require('../utils/multerInitializer.utils').uploadarticlePicture;
const checkAccess = require('../middleware/checkAccess.middleware');
// session middleware
const sessionsCheck = require("../middleware/sessionCheck.middleware");
const authorization = require('../middleware/authorization.middleware');
const articleValidation = require('../middleware/articleValidation.middleware.js');

router.use(sessionsCheck.login);

router.route('/setup')
    .get(addArticlePage)
    .post(upload.single('articlePicture'), articleValidation('create'), addArticleProcess)
    .delete(checkAccess.deleteArticle, delMyArticle);

router.route('/updateArticle/:id')
    .get(checkAccess.updateArticle, updateArticlePage)
    .post(checkAccess.updateArticle, upload.single('articlePicture'), articleValidation('update'), updateArticleProcess);

router.route('/comment/:id')
    .get(authorization(['admin']), userComment)
    .post(comment)
    .delete(delUserComment);

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