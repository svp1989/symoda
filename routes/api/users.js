"use strict";

const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');

router.get('/', userController.findAll);

router.get('/:id', userController.findById);

router.post('/', userController.create);

router.put('/:id', userController.update);

router.post('/login', userController.login);

module.exports = router;