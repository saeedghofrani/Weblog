"use strict";
const express = require('express');
const router = express.Router();
const sessionsCheck = require('../middleware/sessionCheck.middleware');
const userValidation = require('../middleware/userValidation.middleware');
const duplicate = require('../middleware/duplicateCheck.middleware');
const { dashboard, dashboardProcess } = require('../controller/dashboard.controller.js');
router.route('/')
    .get(sessionsCheck.login, dashboard)
    .put(sessionsCheck.login, duplicate.dashboard, userValidation, dashboardProcess);
module.exports = router;