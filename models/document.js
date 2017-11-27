"use strict";

const documentSchema = require('../scheme/Document').schema;

/**
 * Find all documents
 * @param pagination
 * @param cb
 */
exports.findAll = (pagination, cb) => {
    documentSchema.findAll(pagination)
        .then(docs => cb(docs, null))
        .catch(err => cb(null, err));
};

/**
 * Find document by id
 * @param id
 * @param cb
 */
exports.findById = (id, cb) => {
    documentSchema.findOne({where: {id: id}})
        .then(doc => cb(doc, null))
        .catch(err => cb(null, err));
};

/**
 * Find document by id
 * @param hash
 * @param cb
 */
exports.findByHash = (hash, cb) => {
    documentSchema.findOne({where: {hash: hash}})
        .then(doc => cb(doc, null))
        .catch(err => cb(null, err));
};

/**
 * Create User
 * @param doc
 * @param cb
 */
exports.create = (doc, cb) => {
    documentSchema.create(doc)
        .then(user => cb(user, null))
        .catch(err => cb(null, err));
};