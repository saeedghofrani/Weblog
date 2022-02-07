"use strict";
//express
const express = require('express');
const router = express.Router();
//session middleware
const sessionsCheck = require('../middleware/sessionCheck.middleware');
//validation middleware
const userValidation = require('../middleware/userValidation.middleware');
//duplicate Check middleware
const duplicate = require('../middleware/duplicateCheck.middleware');
//controller
const { dashboard, dashboardProcess, avatarProcess } = require('../controller/dashboard.controller.js');
//upload Avatar
const uploadAvatar = require('../')

//check session and cookie
router.use(sessionsCheck.login);

router.route('/')
    .get(dashboard)
    .put(duplicate.dashboard, userValidation('update'), dashboardProcess)
    .post(avatarProcess);

module.exports = router;