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
    .delete(sessionsCheck.login, delMyArticle);

router.route('/updateArticle/:id')
    .get(sessionsCheck.login, updateArticlePage)
    .post(sessionsCheck.login, upload.single('articlePicture'), articleValidation, updateArticleProcess);

//get all article
router.route('/:condition')
    .get(articles);

module.exports = router;    