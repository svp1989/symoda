"use strict";

const express = require('express');
const router = express.Router();
const aclController = require('../../controllers/acl');

router.get('/role/:user(\\d+)', aclController.getRoleByUser);

router.post('/role/:user(\\d+)/:role', aclController.setRoleToUser);

router.delete('/role/:user(\\d+)/:role', aclController.removeUserRole);

router.get('/user/:user(\\\\d+)/permission', aclController.getUserPermissions);

router.post('/permission/:role/:resource/:permission', aclController.setPermission);

router.delete('/permission/:role/:resource/:permission', aclController.removePermission);

module.exports = router;