'use strict';

// core
const debug = require('debug')('APP:TOKEN_GENERATOR');
const logger = require(__base + 'modules/logger');
const co = require('co');

// model
const models = require(__base + 'models');


// library
const moment = require('moment');
const _ = require('lodash');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const crypto_key = 'key';
/**
 * Method
 * @module Method
 */
const Method = module.exports = {};

const encrypto = function (data) {
  try {
    let encrypted = CryptoJS.RC4.encrypt(data, crypto_key);
    return encrypted.toString();
  } catch (err) {
    return err;
  }
};

const decrypto = function (data) {
  try {
    let decrypted_bytes = CryptoJS.RC4.decrypt(data, crypto_key);
    let decryptedData = decrypted_bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (err) {
    return err;
  }
};

const pwEncrypto = function (data) {
  try {
    const cipher = crypto.createCipher('rc4', crypto_key);
    const encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  } catch (err) {
    return err;
  }
};

const pwDecrypto = function (data) {
  try {
    let decipher = crypto.createDecipher('rc4', crypto_key);
    let encrypted = data;
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    return err;
  }
};

Method.encrypto = co.wrap(function*(data) {
  return encrypto(data);
});

Method.decrypto = co.wrap(function*(data) {
  return decrypto(data);
});

Method.pwEncrypto = co.wrap(function*(data) {
  return pwEncrypto(data);
});

Method.pwDecrypto = co.wrap(function*(data) {
  return pwDecrypto(data);
});
