'use strict';

// core
const debug = require('debug')('APP:TRAVEL_AGENCY');

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
    merchantId: 'nullable|min:1|integer|exists:Merchant,id',
    status: 'nullable|min:1|string|in:close,failed,success,frozen,pending',
    sorting: 'nullable|string|in:createdAt,view,opinion',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const filterScopes = [], resultScope = ['includeLcation'];
  const filter = await res.paginatorHelper.initFilter2(req.query);

  // 检索名称
  if (!_.isNil(input.search)) {
    filter.where.$or = {
      title: {
        $iLike: '%' + input.search + '%'
      },
      description: {
        $iLike: '%' + input.search + '%'
      }
    }
  }

  // 检索用户
  if (!_.isNil(input.merchantId)) {
    filter.where.merchantId = input.merchantId;
  }

  // 检索状态
  if (!_.isNil(input.status)) {
    filter.where.status = input.status;
  }

  switch (input.sorting) {
    case 'view':
      filter.order = [['view', 'DESC']];
      break;
    //TODO 缺少好评最多筛选
    case 'createdAt':
      filter.order = [['createdAt', 'DESC']];
      break;
  }

  try {
    let result = await  modelHelper.findAll('TravelAgency', filterScopes, filter, resultScope);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('ENTER show method!');

  const t = await models.sequelize.transaction();
  try {
    const scopes = ['includeLcation'];
    const result = await models.TravelAgency.scope(scopes).findById(req.params.taId, {transaction: t});
    if (!_.isEqual(req.params.permission, 'merchant')) {
      await result.increment({'view': 1}, {transaction: t});
    }
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
  if (!_.isNil(req.files) && !_.isNil(req.files.businessLicense)) {
    req.body.businessLicense = req.files.businessLicense[0];
  }
  if (!_.isNil(req.files) && !_.isNil(req.files.IDFront)) {
    req.body.IDFront = req.files.IDFront[0];
  }
  if (!_.isNil(req.files) && !_.isNil(req.files.IDBack)) {
    req.body.IDBack = req.files.IDBack[0];
  }
  if (!_.isNil(req.files) && !_.isNil(req.files.coverImage)) {
    req.body.coverImage = req.files.coverImage[0];
  }
  if (!_.isNil(req.files) && !_.isNil(req.files.logo)) {
    req.body.logo = req.files.logo[0];
  }

  const rules = {
    merchantId: 'required|min:1|integer|exists:Merchant,id',
    title: 'required|min:4|max:50|string',
    phone: 'required|min:8|max:11|string',
    locationId: 'required|min:1|exists:Location,id',
    address: 'required|min:1|max:250|string',
    description: 'required|min:1|max:3500|string',
    remark: 'nullable|min:1|max:3500|string',
    logo: 'required|image',
    businessLicense: 'required|image',
    IDFront: 'required|image',
    IDBack: 'required|image',
    coverImage: 'required|image',
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
    if (!_.isNull(travel)) {
      throw new MainError('travel', 'alreadyExists');
    }

    let imageAttributes = {}, taAttributes = {};
    taAttributes = _.omit(input, ['IDFront', 'IDBack', 'coverImage', 'businessLicense', 'logo']);
    const location = await models.Location.findById(taAttributes.locationId, {transaction: t});
    if (_.isNull(location.parentId)) {
      throw new MainError('travel', 'chooseSubclass');
    }

    const result = await models.TravelAgency.create(taAttributes, {transaction: t});

    // LOGO
    if (!_.isNil(input.logo)) {
      const fileKey = randomstring.generate(6);
      const extname = input.logo.mimetype.substring(input.logo.mimetype.indexOf('/') + 1).toLowerCase();
      const filename = fileKey + `.${extname}`;
      const cloudPath = `uploads/ta/${result.id}/logo/${filename}`;
      await Storage.disk('local').put(input.logo.path, cloudPath);
      imageAttributes.logo = filename;
    }

    // 封面图
    if (!_.isNil(input.coverImage)) {
      const fileKey = randomstring.generate(6);
      const extname = input.coverImage.mimetype.substring(input.coverImage.mimetype.indexOf('/') + 1).toLowerCase();
      const filename = fileKey + `.${extname}`;
      const cloudPath = `uploads/ta/${result.id}/coverImage/${filename}`;
      await Storage.disk('local').put(input.coverImage.path, cloudPath);
      imageAttributes.coverImage = filename;
    }

    // 身份证正面
    if (!_.isNil(input.IDFront)) {
      const fileKey = randomstring.generate(6);
      const extname = input.IDFront.mimetype.substring(input.IDFront.mimetype.indexOf('/') + 1).toLowerCase();
      const filename = fileKey + `.${extname}`;
      const cloudPath = `uploads/ta/${result.id}/IDFront/${filename}`;
      await Storage.disk('local').put(input.IDFront.path, cloudPath);
      imageAttributes.IDFront = filename;
    }

    // 身份证背面
    if (!_.isNil(input.IDBack)) {
      const fileKey = randomstring.generate(6);
      const extname = input.IDBack.mimetype.substring(input.IDBack.mimetype.indexOf('/') + 1).toLowerCase();
      const filename = fileKey + `.${extname}`;
      const cloudPath = `uploads/ta/${result.id}/IDBack/${filename}`;
      await Storage.disk('local').put(input.IDBack.path, cloudPath);
      imageAttributes.IDBack = filename;
    }

    // 营业执照
    if (!_.isNil(input.businessLicense)) {
      const fileKey = randomstring.generate(6);
      const extname = input.businessLicense.mimetype.substring(input.businessLicense.mimetype.indexOf('/') + 1).toLowerCase();
      const filename = fileKey + `.${extname}`;
      const cloudPath = `uploads/ta/${result.id}/businessLicense/${filename}`;
      await Storage.disk('local').put(input.businessLicense.path, cloudPath);
      imageAttributes.businessLicense = filename;
    }

    // 更新图片入库
    await result.updateAttributes(imageAttributes, {transaction: t});
    await t.commit();

    // 提醒admin 审核
    await jobs.create('email::approved::create_travel_approved', {
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
  if (!_.isNil(req.files) && !_.isNil(req.files.businessLicense)) {
    req.body.businessLicense = req.files.businessLicense[0];
  }
  if (!_.isNil(req.files) && !_.isNil(req.files.IDFront)) {
    req.body.IDFront = req.files.IDFront[0];
  }
  if (!_.isNil(req.files) && !_.isNil(req.files.IDBack)) {
    req.body.IDBack = req.files.IDBack[0];
  }
  if (!_.isNil(req.files) && !_.isNil(req.files.coverImage)) {
    req.body.coverImage = req.files.coverImage[0];
  }
  if (!_.isNil(req.files) && !_.isNil(req.files.logo)) {
    req.body.logo = req.files.logo[0];
  }

  const rules = {
    merchantId: 'nullable|min:1|integer|exists:Merchant,id',
    title: 'nullable|min:4|max:50|string',
    phone: 'nullable|min:8|max:11|string',
    locationId: 'nullable|min:1|exists:Location,id',
    address: 'nullable|min:1|max:250|string',
    description: 'nullable|min:1|max:3500|string',
    remark: 'nullable|min:1|max:3500|string',
    logo: 'nullable|image',
    businessLicense: 'nullable|image',
    IDFront: 'nullable|image',
    IDBack: 'nullable|image',
    coverImage: 'nullable|image',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const ta = await models.TravelAgency.findById(req.params.taId, {transaction: t});
    if (_.isNull(ta)) {
      throw new MainError('common', 'notFound');
    }

    // LOGO
    if (!_.isNil(input.logo)) {
      const fileKey = randomstring.generate(6);
      const extname = input.logo.mimetype.substring(input.logo.mimetype.indexOf('/') + 1).toLowerCase();
      const filename = fileKey + `.${extname}`;
      if (!_.isEqual(filename, ta.logo)) {
        await Storage.disk('local').delete(`uploads/ta/${ta.id}/logo/${ta.logo}`);
      }
      const cloudPath = `uploads/ta/${ta.id}/logo/${filename}`;
      await Storage.disk('local').put(input.logo.path, cloudPath);
      input.logo = filename;
    }

    // 封面图
    if (!_.isNil(input.coverImage)) {
      const fileKey = randomstring.generate(6);
      const extname = input.coverImage.mimetype.substring(input.coverImage.mimetype.indexOf('/') + 1).toLowerCase();
      const filename = fileKey + `.${extname}`;
      if (!_.isEqual(filename, ta.coverImage)) {
        await Storage.disk('local').delete(`uploads/ta/${ta.id}/coverImage/${ta.coverImage}`);
      }
      const cloudPath = `uploads/ta/${ta.id}/coverImage/${filename}`;
      await Storage.disk('local').put(input.coverImage.path, cloudPath);
      input.coverImage = filename;
    }

    // 身份证正面
    if (!_.isNil(input.IDFront)) {
      const fileKey = randomstring.generate(6);
      const extname = input.IDFront.mimetype.substring(input.IDFront.mimetype.indexOf('/') + 1).toLowerCase();
      const filename = fileKey + `.${extname}`;
      if (!_.isEqual(filename, ta.IDFront)) {
        await Storage.disk('local').delete(`uploads/ta/${ta.id}/IDFront/${ta.IDFront}`);
      }
      const cloudPath = `uploads/ta/${ta.id}/IDFront/${filename}`;
      await Storage.disk('local').put(input.IDFront.path, cloudPath);
      input.IDFront = filename;
    }

    // 身份证反面
    if (!_.isNil(input.IDBack)) {
      const fileKey = randomstring.generate(6);
      const extname = input.IDBack.mimetype.substring(input.IDBack.mimetype.indexOf('/') + 1).toLowerCase();
      const filename = fileKey + `.${extname}`;
      if (!_.isEqual(filename, ta.IDBack)) {
        await Storage.disk('local').delete(`uploads/ta/${ta.id}/IDBack/${ta.IDBack}`);
      }
      const cloudPath = `uploads/ta/${ta.id}/IDBack/${filename}`;
      await Storage.disk('local').put(input.IDBack.path, cloudPath);
      input.IDBack = filename;
    }

    // 营业执照
    if (!_.isNil(input.businessLicense)) {
      const fileKey = randomstring.generate(6);
      const extname = input.businessLicense.mimetype.substring(input.businessLicense.mimetype.indexOf('/') + 1).toLowerCase();
      const filename = fileKey + `.${extname}`;
      if (!_.isEqual(filename, ta.businessLicense)) {
        await Storage.disk('local').delete(`uploads/ta/${ta.id}/businessLicense/${ta.filename}`);
      }
      const cloudPath = `uploads/ta/${ta.id}/businessLicense/${filename}`;
      await Storage.disk('local').put(input.businessLicense.path, cloudPath);
      input.businessLicense = filename;
    }

    await ta.updateAttributes(input, {transaction: t});
    await t.commit();

    return res.collection(ta);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const ta = await models.TravelAgency.findOne({
      where: {
        id: req.params.taId,
        $or: [{status: 'pending'}, {status: 'fail'}, {status: 'frozen'}, {status: 'close'}]
      }
    }, {transaction: t});
    if (_.isNull(ta)) throw new MainError('common', 'notFound');

    await ta.destroy({transaction: t});
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
    const ta = await models.TravelAgency.findById(req.params.taId, {transaction: t});
    if (_.isNull(ta)) {
      throw new MainError('common', 'notFound');
    }

    // 不能重複審核
    if (_.isEqual(ta.status, input.status)) {
      throw new MainError('travel', 'approvedLimit');
    }

    const result = await ta.updateAttributes(input, {transaction: t});
    await t.commit();

    // 提醒用户审核审核是否通过
    await jobs.create('email::approved::notice_travel_approved', {
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
