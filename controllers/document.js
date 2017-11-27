"use strict";

const Document = require('../models/document');
const documentService = require('../services/document').service;
const helper = require('../services/helper').service;
const uploadPath = require('../config/upload').uploadPath;

const defaultLimit = 20;

exports.findAll = (req, res) => {
    const limit  = parseInt(req.query.limit) || defaultLimit;
    const page   = parseInt(req.query.page)  || 1;
    const offset = (page - 1) * limit;

    const pagination = {limit: limit, offset: offset, order: [['created_at', 'DESC']]};

    Document.findAll(pagination, (docs, err) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        return res.send(docs);
    });
};

exports.findById = (req, res) => {
    Document.findById(req.params.id, (doc, err) => {
        if (err) {
            return res.status(500).send(helper.errorToJson(err));
        }

        if (doc) {
            return res.send(doc);
        }

        return res.sendStatus(404);
    })
};

exports.download = (req, res) => {
    Document.findByHash(req.params.hash, (doc, err) => {
        if (err) {
            return res.status(500).send(helper.errorToJson(err));
        }

        if (doc) {
            let file = __dirname + '/../' + uploadPath + doc.hash;
            return res.status(200).download(file, doc.file_name);
        }

        return res.sendStatus(404);
    })
};

exports.upload = (req, res) => {
    let docEntity = documentService.createEntity({
        "file": req.file,
        "user_id": req.payload.id,
        "description": req.body.description || null
    });

    Document.create(docEntity, (file, err) => {
        if (err) {
            return res.status(500).send(helper.errorToJson(err));
        }

        Document.findByHash(file.hash, (doc, err) => {
            if (err) {
                return res.status(500).send(helper.errorToJson(err));
            }

            if (doc) {
                return res.send(doc);
            }

            return res.sendStatus(404);
        })
    })
};