// core
const debug = require('debug')('APP:PASSPORT_MIDDLEWARE');


const _ = require('lodash');
const passport = require('passport');


// AUTH
const models = require('../models');

function passportAuthenticateCustomerJWT(type = 'customer-jwt') {
  return function (req, res, next) {
    passport.authenticate(type, async function (err, customer, info) {
      if (err) {
        return next(err);
      }
      if (!customer) {
        return res.error('auth', 'invalidJWT');
      }
      req.customer = customer;
      res.locals.customerAuth = customer;

      return next();
    })(req, res, next);
  }
}


function passportAuthenticateMerchantJWT(type = 'merchant-jwt') {
  return function (req, res, next) {
    passport.authenticate(type, async function (err, merchant, info) {
      if (err) {
        return next(err);
      }
      if (!merchant) {
        return res.error('auth', 'invalidJWT');
      }
      req.merchant = merchant;
      res.locals.merchantAuth = merchant;
      res.locals.travel = await models.TravelAgency.findOne({
        where: {
          merchantId: res.locals.merchantAuth.id
        }
      });

      return next();
    })(req, res, next);
  }
}

function passportAuthenticateAdminJWT(type = 'admin-jwt') {
  return function (req, res, next) {
    passport.authenticate(type, function (err, admin, info) {
      if (err) {
        return next(err);
      }
      if (!admin) {
        return res.error('auth', 'invalidJWT');
      }

      req.admin = admin;
      res.locals.adminAuth = admin;
      return next();
    })(req, res, next);
  }
}

function passportAuthenticateFileJWT(type = 'file-jwt') {
  return function (req, res, next) {
    passport.authenticate(type, async function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.error('auth', 'invalidJWT');
      }

      req.user = user;
      res.locals.userAuth = user;
      return next();
    })(req, res, next);
  }
}

module.exports = {
  passportAuthenticateCustomerJWT,
  passportAuthenticateMerchantJWT,
  passportAuthenticateAdminJWT,
  passportAuthenticateFileJWT
};
