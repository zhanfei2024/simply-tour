'use strict';

// core
const debug = require('debug')('APP:TOKEN_GENERATOR');


// library

const _ = require('lodash');

/**
 * Method
 * @module Method
 */

function toString(data) {
  debug('ENTER toString methods.');

  let result = '';
  _.forEach(data, (n, key) => {
    result += n.replace(/;.+/g, '') + '; ';
  });
  return result;
}


module.exports = {toString};
