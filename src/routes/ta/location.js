'use strict';

// core
const debug = require('debug')('APP:LOCATION');

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
    search: 'nullable|string|min:1',
    parentId: 'nullable|min:1|exists:ServiceLocation,id',
    status: 'nullable|min:1|string|in:hot,overseas',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter2(req.query);
  if (!_.isNull(input.search) && input.search !== '') {
    filter.where.$or = {
      name: {
        $iLike: '%' + input.search + '%'
      }
    };
  }

  if (!_.isNull(input.parentId)) {
    filter.where.parentId = input.parentId;
  }

  // 过滤热门境外景点
  if (!_.isNil(input.status) && _.isEqual(input.status, 'hot')) {
    filter.where.isHot = input.status;
    filter.where.isOverseas = true;
  }

  // 查询境外或非境外景点
  if (!_.isNil(input.status) && _.isEqual(input.status, 'overseas')) {
    filter.where.isOverseas = input.status;
  }


  filter.order = [['order', 'DESC']];
  try {
    const result = await  modelHelper.findAll('Location', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function indexTree(req, res, next) {
  debug('ENTER index by tree method!');

  try {
    const rules = {
      locationId: 'nullable|min:1|integer|exists:Location,id',
      status: 'nullable|min:1|string|in:hot,overseas',
    };
    const input = validateHelper.pick(req.query, rules);
    try {
      await inputCheck.validate(input, rules, res.validatorMessage);
    } catch (err) {
      return res.validateError(err);
    }

    const filter = await res.paginatorHelper.initFilter2(req.query);

    // 筛选某个分类下的子类
    if (!_.isNil(input.locationId)) {
      filter.where.parentId = input.locationId;
    }
    
    // 过滤热门境外景点
    if (!_.isNil(input.status) && _.isEqual(input.status, 'hot')) {
      filter.where.isHot = input.status;
      filter.where.isOverseas = true;
    }

    // 查询境外或非境外景点
    if (!_.isNil(input.status) && _.isEqual(input.status, 'overseas')) {
      filter.where.isOverseas = input.status;
    }

    const categories = await models.Location.findAll(!_.isNil(input.locationId) ? filter : {});

    const result = _.filter(categories, group => {
      return !_.isNil(input.locationId) ? input.locationId : _.isNil(group.parentId);
    });
    getChildren(categories, result);

    return res.collection(result);
  } catch (err) {
    return next(err);
  }
}

function getChildren(groups, result) {
  _.forEach(result, item => {
    const children = _.filter(groups, group => {
      return group.parentId === item.id;
    });
    if (!_.isEmpty(children)) {
      item.setDataValue('children', children);
      getChildren(groups, children);
    }
  });
}

async function create(req, res, next) {
  debug(`ENTER create method!`);

  const rules = {
    name: 'required|min:1|max:250|string',
    parentId: 'nullable|integer|exists:Location,id',
    depth: 'nullable|integer|min:1',
    code: 'nullable|min:1|max:250|string',
    isOverseas: 'nullable|min:1|boolean|in:true,false',
    isHot: 'nullable|min:1|boolean|in:true,false',
  };
  const input = validateHelper.pick(req.body, rules, [], ['parentId']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();
  try {
    if (_.isNaN(parseInt(input.parentId))) {
      delete input.parentId;
    }
    const result = await models.Location.create(input, {transaction: t});
    await t.commit();

    return res.item(result);
  } catch (err) {
    await t.rollback();
    return next(err);
  }

}


async function update(req, res, next) {
  debug(`ENTER update method!`);

  const rules = {
    name: 'required|min:1|max:250|string',
    parentId: 'nullable|integer|exists:Location,id',
    depth: 'nullable|integer|min:1',
    code: 'nullable|min:1|max:250|string',
    isOverseas: 'nullable|min:1|boolean|in:true,false',
    isHot: 'nullable|min:1|boolean|in:true,false',
  };
  const input = validateHelper.pick(req.body, rules, [], ['parentId']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();
  try {
    if (_.isNaN(parseInt(input.parentId))) {
      delete input.parentId;
    }
    const result = await models.Location.findById(req.params.locationId, {transaction: t});
    if (_.isNull(result)) {
      throw new MainError('common', 'notFound');
    }

    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    return res.item(result);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function destroy(req, res, next) {
  debug('ENTER destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Location.findOne({
      where: {
        id: req.params.locationId
      },
      transaction: t,
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.destroy({
      transaction: t
    });
    await t.commit();
    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


module.exports = {
  index,
  indexTree,
  create,
  update,
  destroy
};
