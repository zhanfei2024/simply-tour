'use strict';

// core
const debug = require('debug')('APP:STRIPE');


// model
const models = require('../models');

const stripeConfig = require('../config/stripe');

let stripe = require('stripe')(stripeConfig.stripeSecretKey);

/**
 * Method
 * @module Method
 */
let Method = module.exports = {};

Method.gateway = stripe;

