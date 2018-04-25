// debug
const debug = require('debug')('APP:MERCHANT');

// model
const models = require('../models');
const modelHelper = require('../methods/model');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../helpers/ValidateHelper');

// library
const _ = require('lodash');
const randomstring = require('randomstring');
const Storage = require('../modules/storage');


async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    search: 'nullable|string|min:1',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter2(req.query);

  if (!_.isUndefined(input.search) && input.search !== '') {
    filter.where.$or = {
      lastName: {
        $like: `%${input.search}%`,
      },
      firstName: {
        $like: `%${input.search}%`,
      },
      nickname: {
        $like: `%${input.search}%`,
      },
    };
  }
  filter.order = [['createdAt', 'DESC']];
  try {
    const result = await modelHelper.findAll('Merchant', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  try {
    const result = await models.Merchant.findById(req.params.merchantId);

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}


async function update(req, res, next) {
  debug('ENTER update method!');

  const rules = {
    lastName: 'nullable|string|min:1|max:30',
    firstName: 'nullable|string|min:1|max:30',
    nickname: 'nullable|string|min:1|max:30',
    email: 'nullable|string|min:6|max:36',
    gender: 'nullable|string|in:M,F',
    birth: 'nullable|date_iso8601',
    roleId: 'nullable|integer|exists:Role,id',
    isActive: 'nullable|boolean|in:true,false', // 是否拉黑该用户
    remark: 'nullable|string|min:1'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const merchant = await models.Merchant.findOne({
      where: {
        id: req.params.merchantId,
        isActive: true
      }
    }, {
      transaction: t
    });
    if (_.isNil(merchant)) throw new MainError('common', 'notFound');

    await merchant.updateAttributes(input, {transaction: t});
    if (!_.isNil(input.roleId)) {
      await merchant.setRoles(input.roleId, {transaction: t});
    }
    await t.commit();

    req.params.merchantId = merchant.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const merchant = await models.Merchant.findById(req.params.merchantId, {transaction: t});
    if (_.isNil(merchant)) throw new MainError('common', 'notFound');

    await merchant.destroy({transaction: t});
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function uploadAvatar(req, res, next) {
  debug('Enter upload avatar file method!');

  if (!_.isNil(req.files.profilePhoto)) {
    req.body.profilePhoto = req.files.profilePhoto[0];
  }

  const rules = {
    profilePhoto: 'required|image',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    let avatarAttributes = {};

    const merchant = await models.Merchant.findOne({
      where: {
        id: req.params.merchantId,
        isActive: true
      }
    }, {transaction: t});
    if (_.isNil(merchant)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(6);
    const extname = input.profilePhoto.mimetype.substring(input.profilePhoto.mimetype.indexOf('/') + 1).toLowerCase();
    const filename = `${fileKey}.${extname}`;
    const cloudPath = `uploads/merchant/${merchant.id}/avatar/${filename}`;
    await Storage.disk('local').put(input.profilePhoto.path, cloudPath);
    avatarAttributes.profilePhoto = filename;
    // remove old file if uploading file
    if (!_.isEqual(merchant.profilePhoto, filename)) {
      await Storage.disk('local').delete(`uploads/merchant/${merchant.id}/avatar/${merchant.profilePhoto}`);
    }
    // 修改用户avatar
    await merchant.updateAttributes(avatarAttributes, {transaction: t});
    await t.commit();

    req.params.merchantId = merchant.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

module.exports = {
  index,
  show,
  update,
  destroy,
  uploadAvatar
};
