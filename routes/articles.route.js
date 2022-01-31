"use strict";
//express
const express = require('express');
const router = express.Router();
// controller
const { articles, article, myArticle } = require('../controller/articles.controller.js');
// session middleware
const sessionsCheck = require("../middleware/sessionCheck.middleware");

router.route('/')
    .get(articles);

router.route('/myArticle')
    .get(sessionsCheck.login, myArticle);

router.route('/:id')
    .get(article);
    
module.exports = router;