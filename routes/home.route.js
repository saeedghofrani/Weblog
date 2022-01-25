"use strict";
const express = require('express');
const router = express.Router();
const safeCall = require('../controller/safeCall.controller');
const home = require('../controller/home.controller.js');
router.route('/')
    .get(safeCall(home));
module.exports = router;