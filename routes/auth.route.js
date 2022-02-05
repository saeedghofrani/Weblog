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
const { login, loginProcess, register, registerProcess, logout, pass, passProcces, delAccount, inactivate } = require('../controller/auth.controller.js');

//forget password router
router.route('/pass')
    .get(pass)
    .put(userValidator('pass'), passProcces);

//inactavate user router
router.route('/inActive')
    .get(inactivate);

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


module.exports = router;