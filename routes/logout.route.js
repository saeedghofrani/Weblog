"use strict";
const express = require('express');
const router = express.Router();
const safeCall = require('../controller/safeCall.controller');
const logout = require('../controller/logout.controller.js');
router.route('/')
    .get(safeCall(logout));
module.exports = router;