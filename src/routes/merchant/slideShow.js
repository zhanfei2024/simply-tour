// core
const debug = require('debug')('APP:COC_SLIDESHOW');

// library
const slideShow = require('../../routes/ta/slideShow');

function index(req, res, next) {
  debug('ENTER index method!');

  req.query.type = 'travel';
  req.query.taId = res.locals.travel.id;
  return slideShow.index(req, res, next);
}

function show(req, res, next) {
  debug('ENTER show method!');

  req.params.taId = res.locals.travel.id;
  return slideShow.show(req, res, next);
}

function create(req, res, next) {
  debug('ENTER create method!');

  req.body.type = 'travel';
  req.body.taId = res.locals.travel.id;
  return slideShow.create(req, res, next);
}

function update(req, res, next) {
  debug('ENTER update method!');

  req.body.type = 'travel';
  req.body.taId = res.locals.travel.id;
  return slideShow.update(req, res, next);
}

function destroy(req, res, next) {
  debug('ENTER destroy method!');

  req.params.taId = res.locals.travel.id;
  return slideShow.destroy(req, res, next);
}
module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
