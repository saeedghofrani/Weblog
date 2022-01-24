"use strict";
const express = require('express');
const router = express.Router();
const sessionsCheck = require('../middleware/sessionCheck.middleware');
const userValidator = require('../middleware/userValidation.middleware');
const safeCall = require('../controller/safeCall.controller');
const { register, registerProcess } = require('../controller/register.controller.js');
router.route('/')
    .get(sessionsCheck.dashboard, safeCall(register))
    .post(sessionsCheck.dashboard, userValidator, safeCall(registerProcess));
module.exports = router;