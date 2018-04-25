// core
const debug = require('debug')('APP:CUSTOMER_USER');

// library
const customer = require('../user');

function show(req, res, next) {
  debug('ENTER show method!');
  req.params.customerId = res.locals.customerAuth.id;
  return customer.show(req, res, next);
}

function update(req, res, next) {
  debug('ENTER update method!');

  req.params.customerId = res.locals.customerAuth.id;
  return customer.update(req, res, next);
}

function uploadProfilePhoto(req, res, next) {
  debug(`Enter upload avatar file method!`);
  req.params.customerId = res.locals.customerAuth.id;
  return customer.uploadAvatar(req, res, next);
}

module.exports = {
  show,
  update,
  uploadProfilePhoto
};
