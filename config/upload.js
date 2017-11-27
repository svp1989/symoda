"use strict";

const uploadPath = 'public/uploads/';
const multer = require('multer');
const uploader = multer({dest: uploadPath});

exports.uploadPath = uploadPath;

exports.uploader = uploader;