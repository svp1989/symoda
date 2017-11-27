let jwt = require('express-jwt');
let secret = require('../config').secret;

function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

let auth = function (req, res, next) {
  const allowed_routes = require('../config/security.json').allowed_routes;

  const url = req.url;

  if (allowed_routes.indexOf(url) < 0) {
      jwt({
          secret: secret,
          userProperty: 'payload',
          getToken: getTokenFromHeader
      })(req, res, next);
  } else {
      next();
  }
};

module.exports = auth;