'use strict';

// core
const debug = require('debug')('APP:JPUSH');
const logger = require('../../../modules/logger');

// models
const models = require('../../../models');

// library
const moment = require('moment');
const jpush = require('jpush-sdk');

// jpush config
const config = require('../../../config/jpush.js');
const client = jpush.buildClient(config.appkey, config.masterSecret);


/**
 * push message notify to single user.
 * @param user
 * @param message
 * @args: object
 * @args.user  type:object  system user
 * @args.alert  type:string  need alert message
 * @args.title  need title message
 * @args.type  string
 * @args.id   integer
 */
function pushSingle(args) {

  logger.log('info', 'Starting send push message...');
  return async function () {
    try {
      client.push().setPlatform('ios', 'android')
        .setAudience(jpush.alias(`jPushId${args.user.id}`))
        .setNotification(
          jpush.android(args.alert, args.title, 1, {type: args.type, id: args.id}),
          jpush.ios(args.alert, 'null', 1, true, {type: args.type, id: args.id})
        )
        .setMessage(args.message)
        .setOptions(null, 864000, null, false)
        .send(function (err, res) {
          if (err) {
            logger.log('error', 'Message push failure...');
            throw new MainError(err.message);
          }
          logger.log('info', 'Information is successfully sent out...');
        });

      logger.log('info', 'Successful writing of information...');
    } catch (err) {
      logger.log('error', 'send push message error...');
      throw new MainError(err);
    }
  };
}

/**
 * push message notify to all users.
 * @param message
 * @args: object
 * @args.alert  type:string  need alert message
 * @args.title  need title message
 * @args.type  string
 * @args.id   integer
 */
function pushAll(args) {
  // TODO   加入redis
  logger.log('info', 'Starting send push message...');
  return async function () {
    try {
      client.push().setPlatform('ios', 'android')
        .setAudience(jpush.ALL)
        .setNotification(
          jpush.android(args.alert, args.title, 1, {type: args.type, id: args.id}),
          jpush.ios(args.alert, 'null', 1, true, {type: args.type, id: args.id})
        )
        .setMessage(args.message)
        .setOptions(null, 864000, null, false)
        .send(function (err, res) {
          if (err) {
            logger.log('error', 'Message push failure...');
            throw new MainError(err.message);
          }
        });
      logger.log('info', 'Successful writing of information...');
    } catch (err) {
      logger.log('error', 'send push message error...');
      throw new MainError(err);
    }
  };
}

/**
 * send notify
 * @type {Function}
 */
async function singlePush(args) {

  return await pushSingle(args);
}

/**
 * send notify
 * @type {Function}
 */
async function multiplePush(args) {
  return await pushAll(args);
}

module.exports = {
  singlePush,
  multiplePush
};
