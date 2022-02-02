"use strict";
//express
const express = require('express');
const router = express.Router();
//session middleware
const sessionsCheck = require('../middleware/sessionCheck.middleware');
// validation middleware
const userValidator = require('../middleware/userValidation.middleware');
// duplicate Check middleware
const duplicate = require('../middleware/duplicateCheck.middleware');
//controller
const { login, loginProcess, register, registerProcess, logout, pass, passProcces, delAccount } = require('../controller/auth.controller.js');

//remove acount 
router.route('/delAccount')
    .get(delAccount);

//logout route
router.route('/logout')
    .get(logout);

//check session and cookie
router.use(sessionsCheck.dashboard);

//login router
router.route('/login')
    .get(login)
    .post(loginProcess);

//register router
router.route('/register')
    .get(register)
    .post(duplicate.register, userValidator('create'), registerProcess);

//forget password router
// router.route('/pass')
//     .get(pass)
//     .post(passProcces);

module.exports = router;