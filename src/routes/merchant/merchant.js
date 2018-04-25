// core
const debug = require('debug')('APP:MERCHANT_USER');

// library
const merchant = require('../merchant');

function show(req, res, next) {
  debug('ENTER show method!');
  req.params.merchantId = res.locals.merchantAuth.id;
  return merchant.show(req, res, next);
}

function update(req, res, next) {
  debug('ENTER update method!');
  req.params.merchantId = res.locals.merchantAuth.id;
  return merchant.update(req, res, next);
}

function uploadProfilePhoto(req, res, next) {
  debug(`ENTER upload profile photo method!`);
  req.params.merchantId = res.locals.merchantAuth.id;
  return merchant.uploadAvatar(req, res, next);
}

module.exports = {
  show,
  update,
  uploadProfilePhoto
};
