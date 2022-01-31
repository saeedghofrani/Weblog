"use strict";
//express
const express = require('express');
const router = express.Router();
//controller
const contact = require('../controller/contact.controller.js');

router.route('/')
    .get(contact);

module.exports = router;