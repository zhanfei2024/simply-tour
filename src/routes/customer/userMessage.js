// debug
const debug = require('debug')("APP:USER_MESSAGE");


const userMessageRoute = require('../ta/userMessage');

function index(req, res, next) {
  debug('Enter index method!');

  req.query.customerId = res.locals.userAuth.id;
  return userMessageRoute.index(req, res, next);
}

function show(req, res, next) {
  debug('Enter show method!');

  req.params.customerId = res.locals.userAuth.id;
  return userMessageRoute.show(req, res, next);
}


function update(req, res, next) {
  debug('Enter update method!');

  return userMessageRoute.update(req, res, next);
}

function destroy(req, res, next) {
  debug('Enter index method!');

  req.params.customerId = res.locals.userAuth.id;
  return userMessageRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  update,
  destroy
};
