"use strict";
const express = require('express');
const router = express.Router();
const sessionsCheck = require('../middleware/sessionCheck.middleware');
const userValidation = require('../middleware/userValidation.middleware');
const authorization = require('../middleware/authorization.middleware');
const duplicate = require('../middleware/duplicateCheck.middleware');
const { dashboard, dashboardProcess } = require('../controller/dashboard.controller.js');

//check session and cookie
router.use(sessionsCheck.login);

//authorize for dashboard
router.use(authorization['admin', 'user']);

router.route('/')
    .get(dashboard)
    .put(duplicate.dashboard, userValidation('update'), dashboardProcess);
module.exports = router;