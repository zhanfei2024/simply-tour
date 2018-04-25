'use strict';

// core
const debug = require('debug')('APP:FEEDBACK');

// model
const models = require('../../models');


// library
const _ = require('lodash');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');


async function index(req, res, next) {
  debug('ENTER index method!');

  const rules = {
    search: 'nullable|string|min:1'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter(req.query);
  const scopes = ['includeUser'];
  if (!_.isNil(input.search)) {
    filter.where.$or = {
      name: {
        $iLike: '%' + input.search + '%'
      },
      title: {
        $iLike: '%' + input.search + '%'
      },
      contact: {
        $iLike: '%' + input.search + '%'
      },
    };
  }
  filter.distinct = true;
  filter.include = [];
  filter.order = [['createdAt', 'DESC']];
  try {
    const result = await models.Feedback.scope(scopes).findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}


async function show(req, res, next) {
  debug('ENTER show method!');

  try {
    const result = await models.Feedback.scope(['includeUser']).findOne({
      where: {
        id: req.params.feedbackId
      }
    });

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}


async function create(req, res, next) {
  debug('ENTER create method!');

  const rules = {
    userId: 'required|min:1|integer|exists:User,id',
    name: 'nullable|string|min:1',
    title: 'nullable|string|min:1',
    contact: 'required|string|min:1',
    description: 'required|string|min:1'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Feedback.create(input, {transaction: t});
    await t.commit();

    req.params.feedbackId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function destroy(req, res, next) {
  debug('ENTER destroy method!');
  const t = await models.sequelize.transaction();
  try {

    const result = await models.Feedback.findOne({
      where: {
        id: req.params.feedbackId,
      }
    });
    if (result === null) throw new MainError('common', 'notFound');

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


