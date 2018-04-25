'use strict';

// core
const debug = require('debug')('APP:BOOKMARK');

// library
const bookMarkRoute = require('../ta/bookmark');


async function index(req, res, next) {
  debug(`ENTER index method!`);
  req.query.customerId = res.locals.userAuth.id;
  return bookMarkRoute.index(req, res, next);
}

async function show(req, res, next) {
  debug(`ENTER show method!`);
  req.params.customerId = res.locals.userAuth.id;
  return bookMarkRoute.show(req, res, next);
}

async function create(req, res, next) {
  debug(`ENTER create method!`);
  req.body.customerId = res.locals.userAuth.id;
  return bookMarkRoute.create(req, res, next);
}

async function destroy(req, res, next) {
  debug(`ENTER destroy method!`);
  req.params.customerId = res.locals.userAuth.id;
  return bookMarkRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  destroy
};

