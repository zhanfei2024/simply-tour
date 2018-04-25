'use strict';

// core
const debug = require('debug')('APP:ROUTE');

// model
const models = require('../../models');
const modelHelper = require('../../methods/model');

// library
const _ = require('lodash');
const randomstring = require('randomstring');
const Storage = require('../../modules/storage');
const jobs = require('../../jobs');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');


async function index(req, res, next) {
  debug('ENTER index method!');

  const rules = {
    search: 'nullable|min:1|string',
    taId: 'nullable|min:1|integer|exists:TravelAgency,id',
    type: 'nullable|min:1|string|in:domestic,abroad',
    natures: 'nullable|min:1|string|in:team,self',
    sorting: 'nullable|string|in:createdAt,view,opinion',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const filterScopes = [], resultScope = ['includeSetOutCity', 'includeTravel', 'includeDestinations', 'includeSetOut'];
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
  if (!_.isNil(input.taId)) {
    filter.where.taId = input.taId;
  }

  // 检索线路类型
  if (!_.isNil(input.type)) {
    filter.where.type = input.type;
  }

  // 检索线路性质
  if (!_.isNil(input.natures)) {
    filter.where.natures = input.natures;
  }

  switch (input.sorting) {
    case 'createdAt':
      filter.order = [['createdAt', 'DESC']];
      break;
  }

  try {
    let result = await  modelHelper.findAll('Route', filterScopes, filter, resultScope);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('ENTER show method!');

  const t = await models.sequelize.transaction();
  try {
    const scopes = ['includeSetOutCity', 'includeTravel', 'includeDestinations', 'includeSetOut', 'includeDetails'];
    const result = await models.Route.scope(scopes).findById(req.params.routeId, {transaction: t});
    await t.commit();

    return res.item(result);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function create(req, res, next) {
  debug('ENTER create method!');

  // 合并上传文件
  if (!_.isNil(req.files) && !_.isNil(req.files.file)) {
    req.body.file = req.files.file;
  }

  const rules = {
    taId: 'required|min:1|integer|exists:TravelAgency,id',
    title: 'required|min:4|max:100|string',
    type: 'required|min:1|string|in:domestic,abroad',
    natures: 'required|min:1|string|in:team,self',
    // 出发地
    setOutId: 'required|min:1|integer|exists:Location,id',
    adultPrice: 'required|min:1|numeric',
    childPrice: 'required|min:1|numeric',
    startTime: 'required|date_iso8601',
    endTime: 'required|date_iso8601',
    isActived: 'nullable|min:1|boolean|in:true,false',
    remark: 'nullable|min:1|max:3500|string',
    // 目的地
    destinationIds: 'required|array',
    'destinationIds.*': 'required|min:1|integer|exists:Location,id',
    // 出入日期
    setOutIds: 'required|array',
    'setOutIds.*': 'required|min:1|integer',
    file: 'required|array',
    'file.*': 'required|image',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    // 检查当前用户是否已开通旅行社
    const travel = res.locals.travel;
    if (_.isNull(travel)) {
      throw new MainError('travel', 'createTravel');
    }

    const taAttributes = _.omit(input, ['file', 'file.*']);
    const location = await models.Location.findById(taAttributes.setOutId, {transaction: t});
    if (_.isNull(location.parentId)) {
      throw new MainError('route', 'chooseSubclass');
    }

    const result = await models.Route.create(taAttributes, {transaction: t});

    // 目的地
    if (!_.isNil(input.destinationIds)) {
      const locations = await models.Location.findAll({
        where: {
          id: {
            $in: input.destinationIds
          },
          parentId: {
            $ne: null
          }
        }
      });
      if (locations.length !== input.destinationIds.length) throw new MainError('route', 'destinationValidity');
      await result.setDestinations(locations, {transaction: t});
    }

    // 出发日期
    if (!_.isNil(input.setOutIds)) {
      const setOut = await models.SetOut.findAll({
        where: {
          id: {
            $in: input.setOutIds
          }
        }
      });
      if (setOut.length !== input.setOutIds.length) throw new MainError('route', 'setOutValidity');
      await result.setSetOut(setOut, {transaction: t});
    }

    // 线路图
    if (!_.isEmpty(input.file)) {
      for (let i = 0; i < input.file.length; i++) {
        const fileKey = randomstring.generate(24);
        const extname = input.file[i].mimetype.substring(input.file[i].mimetype.indexOf('/') + 1).toLowerCase();
        const filename = fileKey + `.${extname}`;
        const cloudPath = `uploads/ta/${travel.id}/route/${result.id}/file/${filename}`;
        await Storage.disk('local').put(input.file[i].path, cloudPath);
        let imageAttributes = {
          routeId: result.id,
          size: input.file[i].size,
          name: filename,
          key: fileKey,
          extension: extname,
          mime: input.file[i].mimetype
        };
        await models.RoutePicture.create(imageAttributes, {transaction: t});
      }
    }
    await t.commit();

    // 提醒admin 审核
    await jobs.create('email::approved::create_travel_route_approved', {
      result
    });

    return res.collection(result);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('ENTER update method!');

  // 合并上传文件
  if (!_.isNil(req.files) && !_.isNil(req.files.file)) {
    req.body.file = req.files.file;
  }

  const rules = {
    taId: 'nullable|min:1|integer|exists:TravelAgency,id',
    title: 'nullable|min:4|max:100|string',
    type: 'nullable|min:1|string|in:domestic,abroad',
    natures: 'nullable|min:1|string|in:team,self',
    // 出发地
    setOutId: 'nullable|min:1|integer|exists:Location,id',
    adultPrice: 'nullable|min:1|numeric',
    childPrice: 'nullable|min:1|numeric',
    startTime: 'nullable|date_iso8601',
    endTime: 'nullable|date_iso8601',
    isActived: 'nullable|min:1|boolean|in:true,false',
    remark: 'nullable|min:1|max:3500|string',
    // 目的地
    destinationIds: 'nullable|array',
    'destinationIds.*': 'nullable|min:1|integer|exists:Location,id',
    // 出入日期
    setOutIds: 'nullable|array',
    'setOutIds.*': 'nullable|min:1|integer|exists:SetOut,id',
    file: 'nullable|array',
    'file.*': 'nullable|image',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Route.findOne({
      where: {
        id: req.params.routeId
      },
      transaction: t
    });
    if (_.isNil(result)) {
      throw new MainError('common', 'notFound');
    }

    const location = await models.Location.findById(input.setOutId, {transaction: t});
    if (_.isNull(location.parentId)) {
      throw new MainError('route', 'chooseSubclass');
    }

    // 目的地
    if (!_.isNil(input.destinationIds)) {
      const locations = await models.Location.findAll({
        where: {
          id: {
            $in: input.destinationIds
          },
          parentId: {
            $ne: null
          }
        }
      });
      if (locations.length !== input.destinationIds.length) throw new MainError('route', 'destinationValidity');
      await result.setDestinations(locations, {transaction: t});
    }

    // 出发日期
    if (!_.isNil(input.setOutIds)) {
      const setOut = await models.SetOut.findAll({
        where: {
          id: {
            $in: input.setOutIds
          }
        }
      });
      if (setOut.length !== input.setOutIds.length) throw new MainError('route', 'setOutValidity');
      await result.setSetOut(setOut, {transaction: t});
    }

    // 线路图
    if (!_.isEmpty(input.file)) {
      for (let i = 0; i < input.file.length; i++) {
        const fileKey = randomstring.generate(24);
        const extname = input.file[i].mimetype.substring(input.file[i].mimetype.indexOf('/') + 1).toLowerCase();
        const filename = fileKey + `.${extname}`;
        const cloudPath = `uploads/ta/${result.taId}/route/${result.id}/file/${filename}`;
        await Storage.disk('local').put(input.file[i].path, cloudPath);
        let imageAttributes = {
          routeId: result.id,
          size: input.file[i].size,
          name: filename,
          key: fileKey,
          extension: extname,
          mime: input.file[i].mimetype
        };
        await models.RoutePicture.create(imageAttributes, {transaction: t});
      }
    }
    const taAttributes = _.omit(input, ['file', 'file.*']);
    taAttributes.status = "pending";
    await result.updateAttributes(taAttributes, {transaction: t});
    await t.commit();

    // 提醒admin 审核
    await jobs.create('email::approved::create_travel_route_approved', {
      result
    });

    return res.collection(result);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const route = await models.Route.findOne({
      where: {
        id: req.params.routeId,
      }
    }, {transaction: t});
    if (_.isNull(route)) throw new MainError('common', 'notFound');

    await route.destroy({transaction: t});
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function approvedOrUpdateStatus(req, res, next) {
  debug('ENTER approved or update status method!');

  const rules = {
    status: 'required|min:1|string|in:close,failed,success,frozen,pending',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const route = await models.Route.findById(req.params.routeId, {transaction: t});
    if (_.isNull(route)) {
      throw new MainError('common', 'notFound');
    }

    // 不能重複審核
    if (_.isEqual(route.status, input.status)) {
      throw new MainError('travel', 'approvedLimit');
    }

    const result = await route.updateAttributes(input, {transaction: t});
    await t.commit();

    // 提醒用户审核审核是否通过
    await jobs.create('email::approved::notice_route_approved', {
      result
    });

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
  approvedOrUpdateStatus
};
