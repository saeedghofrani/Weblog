"use strict";
//express
const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization.middleware');
const sessionsCheck = require("../middleware/sessionCheck.middleware");
const { userComment, comment, delUserComment } = require('../controller/comment.controller.js');

router.use(sessionsCheck.login);

router.route('/:id')
    .get(authorization(['admin']), userComment)
    .post(comment)
    .delete(delUserComment);

module.exports = router;