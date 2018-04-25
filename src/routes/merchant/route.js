// core
const debug = require('debug')('APP:ROUTE');

// library
const route = require('../../routes/ta/route');

function index(req, res, next) {
  debug('ENTER index method!');

  req.params.taId = res.locals.travel.id;
  return route.index(req, res, next);
}

function show(req, res, next) {
  debug('ENTER show method!');

  req.params.taId = res.locals.travel.id;
  return route.show(req, res, next);
}

function create(req, res, next) {
  debug('ENTER create method!');

  req.body.taId = res.locals.travel.id;
  return route.create(req, res, next);
}

function createDetails(req, res, next) {
  debug('ENTER create method!');

  req.body.routeId = req.params.routeId;
  return route.createDetails(req, res, next);
}

function update(req, res, next) {
  debug('ENTER update method!');

  req.body.taId = res.locals.travel.id;
  return route.update(req, res, next);
}

function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return route.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  createDetails
};
