"use strict";
const express = require('express');
const router = express.Router();
const sessionsCheck = require('../middleware/sessionCheck.middleware');
const safeCall = require('../controller/safeCall.controller');
const { login, loginProcess } = require('../controller/login.controller.js');
router.route('/')
    .get(sessionsCheck.dashboard, safeCall(login))
    .post(sessionsCheck.dashboard, safeCall(loginProcess));
module.exports = router;