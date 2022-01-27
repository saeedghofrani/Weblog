"use strict";
const express = require('express');
const router = express.Router();
const sessionsCheck = require('../middleware/sessionCheck.middleware');
const userValidator = require('../middleware/userValidation.middleware');
const duplicate = require('../middleware/duplicateCheck.middleware');
const { login, loginProcess, register, registerProcess, logout } = require('../controller/auth.controller.js');

//check session and cookie
router.use(sessionsCheck.dashboard);

//login router
router.route('/login')
    .get(login)
    .post(loginProcess);

//logout router
router.route('/logout')
    .get(logout);

//register router
router.route('/register')
    .get(register)
    .post(duplicate.register, userValidator, registerProcess);

module.exports = router;