// core
const debug = require('debug')('APP:TASK_NOTIFICATION');

// model
const models = require('../../models');

// library
const _ = require('lodash');
const moment = require('moment');
const jpushModule = require('../../modules/jpush');

const prefix = 'notification';

module.exports = (queue) => {

  /**
   * @description push notification all user
   * @method push notification all user
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::jpush::push_notification_all_user`, 1, async (job, done) => {
    debug('running task push notification all user...');

    try {

      await jpushModule.multiplePush(job.data);

      return done();
    } catch (err) {
      return done(err);
    }
  });


  /**
   * @description push notification single user
   * @method push notification single user
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::jpush::push_notification_single_user`, 1, async (job, done) => {
    debug('running task push notification single user...');

    try {

      await jpushModule.singlePush(job.data);

      return done();
    } catch (err) {
      return done(err);
    }
  });


};
