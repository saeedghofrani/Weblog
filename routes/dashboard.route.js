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
const upload = require('../utils/multerInitializer.utils').uploadAvatar;

//check session and cookie
router.use(sessionsCheck.login);

router.route('/')

    //dashboard page
    .get(dashboard)

    //update user data
    .put(duplicate.dashboard, userValidation('update'), dashboardProcess)

    //update avatar
    .post(upload.single('avatar'), avatarProcess);

module.exports = router;