'use strict';

// core
const debug = require('debug')('APP:USER_MESSAGE');

// model
const models = require('../../models');

// library
const _ = require('lodash');
const moment = require('moment');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');


async function index(req, res, next) {
  debug('Enter index  method!');

  const rules = {
    search: 'nullable|string|min:1',
    userId: 'nullable|min:1|integer|exists:User,id',
    isRead: 'nullable|min:1|boolean|in:true,false',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const filter = await res.paginatorHelper.initFilter(req.query);

  // 查找当前用户的消息，与公开的消息
  if (!_.isNil(input.userId)) {
    filter.where.$or = [{
      userId: input.userId,
    }, {
      userId: null,
    }];
  }

  // 搜索某标题
  if (!_.isNil(input.search)) {
    filter.where.$or = {
      title: {
        $iLike: '%' + input.search + '%'
      }
    };
  }

  if (!_.isNil(input.isRead)) {
    filter.where.isread = input.isRead;
  }

  filter.distinct = true;
  filter.include = [];
  filter.order = [['publishAt', 'DESC']];
  try {
    const result = await models.UserMessage.findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('ENTER show  method!');

  const filter = {
    where: {
      id: req.params.messageId,
    }
  };

  // 指定访问自己的消息内容。
  if (!_.isNil(req.params.userId)) {
    filter.where.userId = req.params.userId;
  }

  try {
    const result = await models.UserMessage.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  debug('ENTER create  method!');

  const rules = {
    userId: 'nullable|integer|min:1|exists:User,id',
    title: 'required|string|min:1|max:200',
    contents: 'required|string|min:10',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    // 设置发布时间
    input.publishAt = moment().format('YYYY-MM-DD hh:mm:ss');

    const result = await models.UserMessage.create(input, {transaction: t});
    await t.commit();

    req.params.messageId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }

}

async function update(req, res, next) {
  debug('ENTER update  method!');

  const rules = {
    userId: 'nullable|integer|min:1|exists:User,id',
    title: 'required|string|min:1|max:200',
    contents: 'required|string|min:10',
    isRead: 'required|boolean|min:1|in:true,false',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    // 设置更新发布时间
    input.publishAt = moment().format('YYYY-MM-DD hh:mm:ss');

    const result = await models.UserMessage.findById(req.params.messageId);
    if (_.isNull(result)) {
      throw new MainError('common', 'notFound');
    }

    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.messageId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }

}

async function destroy(req, res, next) {
  debug('ENTER destroy  method!');

  const t = await models.sequelize.transaction();

  const filter = {
    where: {
      id: req.params.messageId,
    },
    transaction: t
  };

  if (!_.isNil(req.params.userId)) {
    filter.where.user = req.params.userId;
  }

  try {
    const result = await models.UserMessage.findOne(filter);
    if (_.isNull(result)) {
      throw new MainError('common', 'notFound');
    }

    await result.destroy({transaction: t});
    await t.commit();
    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
