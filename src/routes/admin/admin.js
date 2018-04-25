// core
const debug = require('debug')('APP:ADMIN_ADMIN');

// model

// library
const adminRoute = require('../../routes/admin');

function index(req, res, next) {
  debug('ENTER index method!');
  return adminRoute.index(req, res, next);
}

function self(req, res, next) {
  debug('ENTER show method!');
  req.params.adminId = res.locals.adminAuth.id;
  return adminRoute.show(req, res, next);
}

function show(req, res, next) {
  debug('ENTER show method!');
  return adminRoute.show(req, res, next);
}

function create(req, res, next) {
  debug('ENTER create method!');
  return adminRoute.create(req, res, next);
}

function update(req, res, next) {
  debug('ENTER update method!');
  return adminRoute.update(req, res, next);
}

function destroy(req, res, next) {
  debug('ENTER destroy method!');
  return adminRoute.destroy(req, res, next);
}

module.exports = {
  index,
  self,
  show,
  create,
  update,
  destroy
};
