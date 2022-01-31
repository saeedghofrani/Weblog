"use strict";
//express
const express = require('express');
const router = express.Router();

// validation middleware
const userValidation = require('../middleware/userValidation.middleware');

// controller
const { admin, adminProcess } = require('../controller/admin.controller.js');

//duplicate Check middleware
const duplicateCheck = require('../middleware/duplicateCheck.middleware');

// session middleware
const sessionsCheck = require("../middleware/sessionCheck.middleware");

// authorization middleware
const authorization = require('../middleware/authorization.middleware');

// check session
router.use(sessionsCheck.login);
// authoriz route for roles
router.use(authorization(['admin']));

router.route('/')
    .get(admin)
    .post(duplicateCheck.admin, userValidation('create'), adminProcess);
module.exports = router;