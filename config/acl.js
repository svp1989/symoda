let Acl       = require('acl');
let AclSeq    = require('acl-sequelize');

let db = require('./db').sequelize;

Acl.prototype.checkPermission = function (resource, action) {
    let middleware = false;

    return function(req, res, next) {
        if (next) {
            middleware = true;
        }

        let uid = req.payload.id;

        acl.hasRole(uid, 'superadmin', function(err, result) {
            if (result) {
                if (middleware) {
                    next();
                } else {
                    return true;
                }
            } else {
                acl.isAllowed(uid, resource, action, function(err, result) {
                    if (middleware) {
                        if (result) {
                            next();
                        } else {
                            let checkError = new Error("user does not have permission to perform this action on this resource");
                            next(checkError);
                        }
                    } else {
                        return !!result;
                    }
                });
            }
        });
    }
};

schema = {
    key: {type: db.Sequelize.STRING, primaryKey: true},
    value: {type: db.Sequelize.STRING}
};

db.define('acl_meta', schema);
db.define('acl_parents', schema);
db.define('acl_permissions', schema);
db.define('acl_resources', schema);
db.define('acl_roles', schema);
db.define('acl_users', schema);

let acl = new Acl(new AclSeq(db, { prefix: 'acl_' }));

module.exports = acl;