"use strict";
//express
const express = require('express');
const router = express.Router();
// controller
const { admin, resetPass, deleteUser } = require('../controller/admin.controller.js');
// session middleware
const sessionsCheck = require("../middleware/sessionCheck.middleware");
// authorization middleware
const authorization = require('../middleware/authorization.middleware');


// check session
router.use(sessionsCheck.login);

// authoriz route for roles
router.use(authorization(['admin']));

router.route('/')

    //admin page
    .get(admin)

    //restet user password
    .patch(resetPass)

    //delete user
    .delete(deleteUser)

module.exports = router;