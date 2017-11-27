"use strict";

const passport = require('passport');
require('../config/passport');
const Jwt = require('../services/jwt').service;

const User = require('../models/user');
const userService = require('../services/user').service;
const helper = require('../services/helper').service;

const defaultLimit = 20;

exports.findAll = (req, res) => {
    const limit  = parseInt(req.query.limit) || defaultLimit;
    const page   = parseInt(req.query.page)  || 1;
    const offset = (page - 1) * limit;

    const pagination = {limit: limit, offset: offset, order: [['created_at', 'DESC']]};

    User.findAll(pagination, (users, err) => {
        if (err) {
            return res.status(500).send(helper.errorToJson(err));
        }

        return res.send(users);
    });
};

exports.findById = (req, res) => {
    User.findById(req.params.id, (user, err) => {
        if (user) {
            return res.send(user);
        }
        return res.sendStatus(404);
    })
};

exports.create = (req, res) => {
    let userEntity = userService.createEntity(req.body.user);
    User.create(userEntity, (user, err) => {
        if (user) {
            return res.send(user);
        }

        return res.status(422).json(helper.errorToJson(err));
    })
};

exports.update = (req, res) => {
    let userEntity = userService.createEntity(req.body.user);
    let userId = req.params.id;
    User.update(userId, userEntity, (user, err) => {
        if (err) {
            return res.status(422).json(helper.errorToJson(err))
        }
        return res.json({status:'ok'});
    })
};

exports.login = (req, res, next) => {
    if (!req.body.user.password) {
        return res.status(400).json({errors: {password: "can't be blank"}});
    }

    function passportResponse(err, user, info) {
        if (err) {
            return next(err);
        }

        if (user) {
            let jwt = new Jwt(user);
            user.token = jwt.generateJWT();

            return res.json({user: jwt.toAuthJSON()});
        } else {
            return res.status(422).json(info);
        }
    }

    if (req.body.user.login) {
        passport.authenticate('login-auth', {session: false}, passportResponse)(req, res, next);
    } else {
        return res.status(400).json({errors: {error: "Login can't be blank"}});
    }
};

exports.checkAuth = (login, password, done) => {
    User.checkAuth(login, (user, err) => {
        if (user) {
            let isPasswordValid = new userService(user).validPassword(password);
            if (isPasswordValid) {
                return done(null, user);
            }
        }
        return done(null, false, {errors: {'login or password': 'is invalid'}})
    })
};