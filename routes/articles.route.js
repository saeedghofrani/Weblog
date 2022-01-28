"use strict";
const express = require('express');
const router = express.Router();
const { articles, article, myArticle } = require('../controller/articles.controller.js');
const sessionsCheck = require("../middleware/sessionCheck.middleware");
router.route('/')
    .get(articles);
router.route('/myArticle')
    .get(sessionsCheck.login, myArticle);
router.route('/:id')
    .get(article);
module.exports = router;