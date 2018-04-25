// core
const debug = require('debug')('APP:TASK_EMAIL');
const logger = require('../../modules/logger');

// config
const commonConfig = require('../../config/common');

// model
const models = require('../../models');

// library
const _ = require('lodash');
const moment = require('moment');
const viewMethod = require('../../methods/ViewMethod');
const mailModule = require('../../modules/mail');

const defaultTemplateData = {
  siteUrl: commonConfig.baseUrl,
  siteTitle: commonConfig.siteTitle,
  siteTeamName: commonConfig.systemTeamName,
  siteSupportEmail: commonConfig.siteSupportEmail,
  currentYear: moment().format('YYYY'),
  sourceUrl: commonConfig.sourceUrl,
};

const prefix = 'email';

module.exports = (queue) => {

  /**
   * @description Send mail to admin, create travel approved
   * @method Apply travel agency
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::approved::create_travel_approved`, 1, async (job, done) => {
    debug('running task apply create store approved notice...');
    const send = async () => {
      const data = job.data.result;

      const path = `mail/travel/create_travel_approved.hbs`;
      try {
        // Base data
        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          restaurant: data.title
        }));

        await mailModule.sendMail({
          email: commonConfig.cs,
          lastName: '',
          firstName: '',
        }, `[${commonConfig.siteTitle}]: Apply create travel Notification.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });


  /**
   * @description Send mail to user, notice travel approved
   * @method Apply travel agency
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::approved::notice_travel_approved`, 1, async (job, done) => {
    debug('running task apply create store approved notice...');
    const send = async () => {
      const data = job.data.result;
      let status = '';
      switch (data.status) {
        case 'close':
          status = '已關閉';
          break;
        case 'failed':
          status = '失敗';
          break;
        case 'success':
          status = '成功';
          break;
        case 'frozen':
          status = '已凍結';
          break;
        case 'pending':
          status = '等待中';
          break;
      }

      const path = `mail/travel/notice_travel_approved.hbs`;
      try {
        const merchant = await models.Merchant.findById(data.merchantId);

        // Base data
        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          restaurant: data.title,
          status: status
        }));

        await mailModule.sendMail({
          email: merchant.email,
          lastName: '',
          firstName: '',
        }, `[${commonConfig.siteTitle}]: Apply create travel Notification.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });


  /**
   * @description Send mail to user, notice travel route approved
   * @method Apply travel agency route
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::approved::create_travel_route_approved`, 1, async (job, done) => {
    debug('running task apply create travel route approved notice...');
    const send = async () => {
      const data = job.data.result;

      const path = `mail/travel/create_travel_route_approved.hbs`;
      try {
        // Base data
        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          restaurant: data.title
        }));

        await mailModule.sendMail({
          email: commonConfig.cs,
          lastName: '',
          firstName: '',
        }, `[${commonConfig.siteTitle}]: Apply create travel route notification.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });


  /**
   * @description Send mail to user, notice route approved
   * @method Apply travel agency
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::approved::notice_route_approved`, 1, async (job, done) => {
    debug('running task apply create store approved notice...');
    const send = async () => {
      const data = job.data.result;
      let status = '';
      switch (data.status) {
        case 'close':
          status = '已關閉';
          break;
        case 'failed':
          status = '失敗';
          break;
        case 'success':
          status = '成功';
          break;
        case 'frozen':
          status = '已凍結';
          break;
        case 'pending':
          status = '等待中';
          break;
      }

      const path = `mail/travel/notice_route_approved.hbs`;
      try {
        const merchant = await models.Merchant.findById(data.merchantId);

        // Base data
        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          restaurant: data.title,
          status: status
        }));

        await mailModule.sendMail({
          email: merchant.email,
          lastName: '',
          firstName: '',
        }, `[${commonConfig.siteTitle}]: Apply create route notification.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });

};
