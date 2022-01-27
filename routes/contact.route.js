"use strict";
const express = require('express');
const router = express.Router();
const contact = require('../controller/contact.controller.js');
router.route('/')
    .get(contact);
module.exports = router;