"use strict";

const express = require('express');
const router = express.Router();
const documentController = require('../../controllers/document');
const uploader = require('../../config/upload').uploader;

router.get('/', documentController.findAll);

router.get('/:id(\\d+)', documentController.findById);

router.get('/:hash', documentController.download);

router.post('/', uploader.single('document'), documentController.upload);

module.exports = router;