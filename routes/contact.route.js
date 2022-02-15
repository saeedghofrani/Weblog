"use strict";
//express
const express = require('express');
const router = express.Router();
//controller
const { contact, contactProcces } = require('../controller/contact.controller.js');

router.route('/')
    .get(contact)
    .post(contactProcces);

module.exports = router;