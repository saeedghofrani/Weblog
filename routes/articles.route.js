"use strict";
const express = require('express');
const router = express.Router();
const safeCall = require('../controller/safeCall.controller');
const { articles, article } = require('../controller/articles.controller.js');
router.route('/')
    .get(safeCall(articles));
module.exports = router;