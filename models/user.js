"use strict";

const userSchema = require('../scheme/User').schema;
const Sequelize = require('../config/db').Sequelize;

/**
 * Find all users
 * @param pagination
 * @param cb
 */
exports.findAll = (pagination, cb) => {
    userSchema.findAll(pagination)
        .then(users => cb(users, null))
        .catch(err => cb(null, err));
};

/**
 * Find User by id
 * @param id
 * @param cb
 */
exports.findById = (id, cb) => {
    userSchema.findById(id)
        .then(user => cb(user, null))
        .catch(err => cb(null, err));
};

/**
 * Create User
 * @param user
 * @param cb
 */
exports.create = (user, cb) => {
    userSchema.create(user)
        .then(user => cb(user, null))
        .catch(err => cb(null, err));
};

/**
 * Update User
 * @param id
 * @param newData
 * @param cb
 */
exports.update = (id, newData, cb) => {
    userSchema.update(newData, {where: {id: id}})
        .then(user => cb(user, null))
        .catch(err => cb(null, err));
};

/**
 * Find User by login/email/phone
 * @param login
 * @param cb
 */
exports.checkAuth = (login, cb) => {
    const findToFields = {
        where: Sequelize.or(
            {login: login},
            {email: login},
            {phone: login}
        )
    };

    userSchema.findOne(findToFields)
        .then(user => cb(user, null))
        .catch(err => cb(null, err));
};