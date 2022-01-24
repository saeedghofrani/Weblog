"use strict";
const express = require('express');
const router = express.Router();
const sessionsCheck = require('../middleware/sessionCheck.middleware');
const userValidation = require('../middleware/userValidation.middleware');
const safeCall = require('../controller/safeCall.controller');
const { dashboard, dashboardProcess } = require('../controller/dashboard.controller.js');
router.route('/')
    .get(sessionsCheck.login, safeCall(dashboard))
    .put(sessionsCheck.login, userValidation, safeCall(dashboardProcess));
module.exports = router;