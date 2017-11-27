"use strict";

const acl = require('../config/acl');
const helper = require('../services/helper').service;

exports.getRoleByUser = (req, res) => {
    acl.userRoles(req.params.user, (err, roles) => {
        if (err) {
            return res.status(500).json(helper.errorToJson(err));
        }

        return res.send(roles);
    });
};

exports.setRoleToUser = (req, res) => {
    acl.addUserRoles(req.params.user, req.params.role, (err) => {
        if (err) {
            return res.status(500).json(helper.errorToJson(err));
        }

        return res.send({status: "ok"});
    });
};

exports.removeUserRole = (req, res) => {
    acl.removeUserRoles(req.params.user, req.params.role, (err) => {
        if (err) {
            return res.status(500).json(helper.errorToJson(err));
        }

        return res.send({status: "ok"});
    });
};

exports.getUserPermissions = (req, res) => {
    acl.userRoles(req.params.user, (err, roles) => {
        if (err) {
            return res.status(500).json(helper.errorToJson(err));
        }

        let result = roles.map(function (role) {
            let resources = [];
            acl.whatResources(role).then(function (resource) {
                resources.push(resource);
            });

            return {role: role, resources: resources}
        });

        return res.status(200).json(result);
    });
};

exports.setPermission = (req, res) => {
    acl.allow(req.params.role, req.params.resource, req.params.permission, (err) => {
        if (err) {
            return res.status(500).json(helper.errorToJson(err));
        }

        return res.send({status: "ok"});
    });
};

exports.removePermission = (req, res) => {
    acl.removeAllow(req.params.role, req.params.resource, req.params.permission, (err) => {
        if (err) {
            return res.status(500).json(helper.errorToJson(err));
        }

        return res.send({status: "ok"});
    });
};