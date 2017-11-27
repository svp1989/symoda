"use strict";
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('../controllers/user');

passport.use('login-auth', new LocalStrategy({
    usernameField: 'user[login]',
    passwordField: 'user[password]'
}, (login, password, done) => userController.checkAuth(login, password, done)));