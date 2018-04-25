// core
const debug = require('debug')('APP:JOBS');
const logger = require('../modules/logger');

// config
const queueConfig = require('../config/queue');

// library
const _ = require('lodash');
const kue = require('kue');
const redis = require('redis');

const queue = kue.createQueue({
  prefix: queueConfig.connections.redis.prefix,
  redis: {
    createClientFactory: function () {
      return redis.createClient({
        port: queueConfig.connections.redis.port,
        host: queueConfig.connections.redis.host,
      });
    }
  }
});
queue.setMaxListeners(1000);

/**
 * Method
 * @module Method
 */
let Method = module.exports = {};


/**
 * @description create queue
 * @method create
 * @param  {String} type
 * @param  {Object} data
 * @param  {String} priority
 * @param  {Number} attempts
 * @return {Promise}
 * @public
 */
Method.queue = queue;

/**
 * @description create queue
 * @method create
 * @param  {String} type
 * @param  {Object} data
 * @param  {String} priority
 * @param  {Number} attempts
 * @return {Promise}
 * @public
 */
Method.create = function (type, data, priority, attempts, delay) {
  attempts = attempts || 1;
  priority = priority || 'normal';
  logger.log('info', `added ${type} queue!`);
  return new Promise(function (resolve, reject) {
    const job = queue.create(type, data).delay(delay ? delay : 0).priority(priority).attempts(attempts).save(function (err) {
      if (err) return reject(err);
      return resolve(job.id);
    });
  });
};

/**
 * cancel queue task
 * @param jobId
 * @returns {Promise}
 */
Method.cancel = function (id) {
  debug('enter cancel method');
  return new Promise(function (resolve, reject) {
    kue.Job.get(id, function (err, job) {
      if (err) return reject(err);
      job.remove(function (error) {
        if (error) return reject(error);
        return resolve(`removed job ${job.id}`);
      })
    })
  })
};

/**
 *
 * @param key
 * @param value
 * @param expire time(seconds)
 * @returns {Promise}
 */
Method.set = function (key, val, expire) {
  return new Promise((resolve, reject) => {
    try {
      queue.client.set(key, val);
      if (expire) queue.client.expire(key, expire);
      return resolve(true);
    } catch (err) {
      return reject(err);
    }
  });
};

/**
 *
 * @param key
 * @returns {Promise}
 */
Method.get = function (key) {
  return new Promise((resolve, reject) => {
    try {
      queue.client.get(key, (err, reply) => {
        if (err) return reject(err);
        return resolve(reply);
      });
    } catch (err) {
      return reject(err);
    }
  })
};

/**
 *
 * @param key
 * @returns {Promise}
 */
Method.del = function(key) {
  return new Promise((resolve, reject) => {
    try {
      queue.client.del(key, (err, reply) => {
        if (err) return reject(err);
        return resolve(reply);
      });
    } catch (err) {
      return reject(err);
    }
  })
};
