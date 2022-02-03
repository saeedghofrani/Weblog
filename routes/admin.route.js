"use strict";
//express
const express = require('express');
const router = express.Router();

// controller
const { admin } = require('../controller/admin.controller.js');

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
module.exports = router;