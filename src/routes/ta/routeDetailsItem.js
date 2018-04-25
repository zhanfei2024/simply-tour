'use strict';

// core
const debug = require('debug')('APP:ROUTE_DETAILS_ITEM');

// model
const models = require('../../models');
const modelHelper = require('../../methods/model');

// library
const _ = require('lodash');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');


async function index(req, res, next) {
  debug('ENTER index method!');

  const rules = {
    search: 'nullable|min:1|string',
    routeDetailsId: 'nullable|min:1|integer|exists:RouteDetails,id',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const filterScopes = [], resultScope = [];
  const filter = await res.paginatorHelper.initFilter2(req.query);

  // 检索名称
  if (!_.isNil(input.search)) {
    filter.where.$or = {
      title: {
        $iLike: '%' + input.search + '%'
      }
    }
  }

  // 检索旅行社
  if (!_.isNil(input.routeDetailsId)) {
    filter.where.routeDetailsId = input.routeDetailsId;
  }
  filter.order = [['createdAt', 'DESC']];

  try {
    let result = await modelHelper.findAll('RouteDetailsItem', filterScopes, filter, resultScope);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('ENTER show method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.RouteDetailsItem.findById(req.params.itemId, {transaction: t});
    await t.commit();

    return res.item(result);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function create(req, res, next) {
  debug('ENTER create route details method!');

  const rules = {
    routeDetailsId: 'required|min:1|integer|exists:RouteDetails,id',
    title: 'required|min:1|string|max:200',
    sort: 'required|min:1|integer',
    breakfast: 'required|min:1|string|max:200',
    dinner: 'required|min:1|string|max:200',
    lunch: 'required|min:1|string|max:200',
    lodge: 'required|min:1|string|max:200',
    traffic: 'required|min:1|string|max:200',
    scheduling: 'required|min:1|string|max:3500',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {

    // 时间安排
    const details = await models.RouteDetailsItem.create(input, {transaction: t});
    await t.commit();

    return res.collection(details);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('ENTER update route details method!');

  const rules = {
    title: 'nullable|min:1|string|max:200',
    sort: 'nullable|min:1|integer',
    breakfast: 'nullable|min:1|string|max:200',
    dinner: 'nullable|min:1|string|max:200',
    lunch: 'nullable|min:1|string|max:200',
    lodge: 'nullable|min:1|string|max:200',
    traffic: 'nullable|min:1|string|max:200',
    scheduling: 'nullable|min:1|string|max:3500',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {

    //  检查旅行社是否创建路线详情
    const result = await models.RouteDetailsItem.findOne({
      where: {
        id: req.params.itemId
      },
      transaction: t
    });
    if (_.isNil(result)) {
      throw new MainError('common', 'notFound');
    }

    // 时间安排
    const item = await result.updateAttributes(input, {transaction: t});
    await t.commit();

    return res.collection(item);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const item = await models.RouteDetailsItem.findOne({
      where: {
        id: req.params.itemId
      }
    }, {transaction: t});
    if (_.isNull(item)) throw new MainError('common', 'notFound');

    await item.destroy({transaction: t});
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
  destroy
};
