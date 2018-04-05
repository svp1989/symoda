"use strict";

const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/documents', require('./documents'));
router.use('/acl', require('./acl'));

module.exports = router;