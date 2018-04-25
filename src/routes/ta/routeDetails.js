'use strict';

// core
const debug = require('debug')('APP:ROUTE_DETAILS');

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
    type: 'nullable|min:1|string|in:time,content',
    routeId: 'nullable|min:1|integer|exists:Route,id',
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
      feature: {
        $iLike: '%' + input.search + '%'
      },
      schedule: {
        $iLike: '%' + input.search + '%'
      },
      cost: {
        $iLike: '%' + input.search + '%'
      },
      notice: {
        $iLike: '%' + input.search + '%'
      }
    }
  }

  // 检索旅行社
  if (!_.isNil(input.routeId)) {
    filter.where.routeId = input.routeId;
  }

  // 检索线路类型
  if (!_.isNil(input.type)) {
    filter.where.type = input.type;
  }
  filter.order = [['createdAt', 'DESC']];

  try {
    let result = await modelHelper.findAll('RouteDetails', filterScopes, filter, resultScope);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('ENTER show method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.RouteDetails.findById(req.params.routeId, {transaction: t});
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
    routeId: 'required|min:1|integer|exists:Route,id',
    type: 'required|min:1|string|in:time,content',
    days: 'required_if:type,time|min:1|integer',
    night: 'required_if:type,time|min:1|integer',
    feature: 'required|min:1|string|max:3500',
    schedule: 'required_if:type,content|min:1|string|max:3500',
    cost: 'required|min:1|string|max:3500',
    notice: 'required|min:1|string|max:3500',
    remark: 'nullable|min:1|string|max:3500'
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
    const result = await models.RouteDetails.findAll({
      where: {
        routeId: input.routeId
      },
      transaction: t
    });
    if (result.length > 1) {
      throw new MainError('route', 'limitRecord');
    }

    // 时间安排
    const details = await models.RouteDetails.create(input, {transaction: t});
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
    type: 'nullable|min:1|string|in:time,content',
    days: 'required_if:type,time|min:1|integer',
    night: 'required_if:type,time|min:1|integer',
    feature: 'nullable|min:1|string|max:3500',
    schedule: 'required_if:type,content|min:1|string|max:3500',
    cost: 'nullable|min:1|string|max:3500',
    notice: 'nullable|min:1|string|max:3500',
    remark: 'nullable|min:1|string|max:3500'
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
    const result = await models.RouteDetails.findOne({
      where: {
        id: req.params.detailsId
      },
      transaction: t
    });
    if (_.isNil(result)) {
      throw new MainError('common', 'notFound');
    }

    // 时间安排
    const details = await result.updateAttributes(input, {transaction: t});
    await t.commit();

    return res.collection(details);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const details = await models.RouteDetails.findOne({
      where: {
        id: req.params.detailsId
      }
    }, {transaction: t});
    if (_.isNull(details)) throw new MainError('common', 'notFound');

    await details.destroy({transaction: t});
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
