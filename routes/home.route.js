"use strict";
const express = require('express');
const router = express.Router();
const home = require('../controller/home.controller.js');
router.route('/')
    .get(home);
module.exports = router;