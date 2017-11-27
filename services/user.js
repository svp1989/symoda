/**
 * Service work with users
 * @type {exports.user}
 */
exports.service = class {

    constructor(user = null) {
        this.user = user;
        this.crypto = require('crypto');
        return this;
    }

    /**
     * Validation password
     * @param password
     * @returns {boolean}
     */
    validPassword(password) {
        if (this.user) {
            let hash = this.crypto.pbkdf2Sync(password, this.user.salt, 10000, 512, 'sha512').toString('hex');
            return this.user.hash === hash;
        }
        return false;
    }

    /**
     * Set password
     * @param password
     * @returns {{}|*}
     */
    setPassword(password) {
        this.user.salt = this.crypto.randomBytes(16).toString('hex');
        this.user.hash = this.crypto.pbkdf2Sync(password, this.user.salt, 10000, 512, 'sha512').toString('hex');
        return this.user;
    }

    /**
     * Create entity for save to database
     * @param data
     * @returns {{}|*}
     */
    static createEntity(data) {
        let crypto = require('crypto');
        let userEntity = {};
        for (let field in data) {
            if (field === 'password') {
                userEntity.salt = crypto.randomBytes(16).toString('hex');
                userEntity.hash = crypto.pbkdf2Sync(data[field], userEntity.salt, 10000, 512, 'sha512').toString('hex');
            } else {
                userEntity[field] = data[field];
            }
        }

        return userEntity;
    }
};