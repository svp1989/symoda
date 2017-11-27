"use strict";

const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');

router.get('/users', userController.findAll);

router.get('/user/:id', userController.findById);

router.post('/user', userController.create);

router.put('/user/:id', userController.update);

router.post('/users/login', userController.login);

module.exports = router;