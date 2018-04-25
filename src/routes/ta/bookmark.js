'use strict';

// core
const debug = require('debug')('APP:BOOK_MARK');

// model
const models = require('../../models');
const modelHelper = require('../../methods/model');


// library
const _ = require('lodash');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');


async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    customerId: 'nullable|integer|exists:User,id',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  //关联内容
  const filter = await res.paginatorHelper.initFilter2(req.query);

  if (!_.isNil(input.customerId)) {
    filter.where.customerId = input.customerId;
  }

  filter.order = [['createdAt', 'DESC']];
  try {
    const resultScopes = ['includeCustomer', 'includeStore'];
    const result = await  modelHelper.findAll('Boomark', [], filter, resultScopes);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('ENTER show methods!');

  const filter = {
    where: {
      customerId: req.params.customerId,
    }
  };

  if (!_.isNil(req.params.bookmarkId)) {
    filter.where.id = req.params.bookmarkId;
  }

  if (!_.isNil(req.params.storeId)) {
    filter.where.storeId = req.params.storeId;
  }

  try {
    // 关联内容
    const resultScopes = ['includeCustomer', 'includeStore'];
    let result = await models.Bookmark.scope(resultScopes).findOne(filter);

    // 返回收藏状态
    if (_.isNil(result)) {
      result = {bookmarkStatus: false};
    } else {
      result.dataValues.bookmarkStatus = true;
    }
    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  debug('ENTER create methods!');

  const rules = {
    type: 'nullable|string|min:1|in:expert,service',
    customerId: 'required|integer|exists:User,id',
    storeId: 'nullable|integer|exists:Store,id'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const filter = {
      where: {
        customerId: input.customerId,
      },
      transaction: t
    };

    const result = await models.Bookmark.findOne(filter);
    if (_.isNil(result)) {
      await models.Bookmark.create(input, {transaction: t});
    } else {
      await result.destroy({transaction: t});
    }
    await t.commit();

    req.params.customerId = input.customerId;
    req.params.storeId = input.storeId;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('ENTER destroy methods!');

  const t = await models.sequelize.transaction();
  try {
    const filter = {
      where: {
        customerId: req.params.customerId,
        id: req.params.bookmarkId
      },
      transaction: t
    };

    const result = await models.Bookmark.findOne(filter);
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
  destroy
};

