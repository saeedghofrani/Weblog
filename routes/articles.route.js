"use strict";
//express
const express = require('express');
const router = express.Router();
// controller
const { articles, addArticlePage, addArticleProcess, delMyArticle, updateArticleProcess, updateArticlePage } = require('../controller/articles.controller.js');
//multer middleware
const upload = require('../utils/multerInitializer.utils').uploadarticlePicture;
// session middleware
const sessionsCheck = require("../middleware/sessionCheck.middleware");

const articleValidation = require('../middleware/articleValidation.middleware.js');

router.route('/setup')
    .get(sessionsCheck.login, addArticlePage)
    .post(sessionsCheck.login, upload.single('articlePicture'), articleValidation, addArticleProcess)
    .patch(sessionsCheck.login, upload.single('articlePicture'), updateArticleProcess);

router.route('/updateArticle/:id')
    .get(sessionsCheck.login, updateArticlePage);

//get all article
router.route('/:condition')
    .get(articles)
    .delete(sessionsCheck.login, delMyArticle);

module.exports = router;