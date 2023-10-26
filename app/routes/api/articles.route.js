"use strict";
//express
const express = require('express');
const router = express.Router();
// controller
const { articles, addArticlePage, addArticleProcess, delMyArticle, updateArticleProcess, updateArticlePage, comment, favorit, userComment, delUserComment, searchProcess } = require('../../controller/api/articles.controller.js');
//multer middleware
const upload = require('../../utils/multerInitializer.utils.js').uploadarticlePicture;
const checkAccess = require('../../middleware/checkAccess.middleware.js');
// session middleware
const sessionsCheck = require("../../middleware/sessionCheck.middleware.js");

const articleValidation = require('../../middleware/articleValidation.middleware.js');

router.use(sessionsCheck.login);

router.route('/setup')
    .get(addArticlePage)
    .post(upload.single('articlePicture'), articleValidation('create'), addArticleProcess)
    .delete(checkAccess.deleteArticle, delMyArticle);

router.route('/updateArticle/:id')
    .get(checkAccess.updateArticle, updateArticlePage)
    .post(checkAccess.updateArticle, upload.single('articlePicture'), articleValidation('update'), updateArticleProcess);

router.route('/favorit/:id')
    .post(favorit);

router.route('/:condition')
    .get(articles)
    .post(searchProcess);

module.exports = router;    