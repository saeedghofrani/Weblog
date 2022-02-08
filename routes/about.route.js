"use strict";
//express
const express = require('express');
const router = express.Router();
//controller
const about = require('../controller/about.controller.js');

router.route('/')
    //about page
    .get(about);

module.exports = router;