"use strict";
//express
const express = require('express');
const router = express.Router();
//controller
const home = require('../controller/home.controller.js');

router.route('/')
    .get(home);
    
module.exports = router;