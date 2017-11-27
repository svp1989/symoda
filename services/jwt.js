'use strict';
let jwt = require("jsonwebtoken");

/**
 * service Jwt
 * @param user
 * @returns {*}
 */
exports.service = class {

    constructor(user) {
        this.user = user;
        this.secret = 'secret';
    }

    generateJWT() {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        return jwt.sign({
            id: this.user.id,
            username: this.user.username,
            exp: parseInt(exp.getTime() / 1000),
        }, this.secret);
    }

    toAuthJSON() {
        return {
            username: this.user.username,
            email: this.user.email,
            token: this.generateJWT(),
        };
    }

    toProfileJSONFor() {
        return {
            username: this.user.username,
        }
    }
};
