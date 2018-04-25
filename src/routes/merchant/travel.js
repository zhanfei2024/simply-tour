// core
const debug = require('debug')('APP:TRAVEL');

// library
const travel = require('../../routes/ta/travelAgency');


function show(req, res, next) {
  debug('ENTER show method!');

  req.params.taId = res.locals.travel.id;
  req.params.permission = 'merchant';
  return travel.show(req, res, next);
}

function create(req, res, next) {
  debug('ENTER create method!');

  req.body.merchantId = res.locals.merchantAuth.id;
  return travel.create(req, res, next);
}

function update(req, res, next) {
  debug('ENTER update method!');

  req.body.merchantId = res.locals.merchantAuth.id;
  req.params.taId = res.locals.travel.id;
  return travel.update(req, res, next);
}

module.exports = {
  show,
  create,
  update
};
