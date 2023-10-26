"use strict";
//express
const express = require('express');
const router = express.Router();
//controller

const { contact, contactProcces, home, about } = require('../../controller/api/expose.controller.js');

router.route('/home')
    .get(home);

router.route('/about')
    //about page
    .get(about);

router.route('/contact')
    .get(contact)
    .post(contactProcces);

module.exports = router;