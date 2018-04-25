const debug = require('debug')('APP:SETTING');

// model
const models = require('../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../helpers/ValidateHelper');

// library
const _ = require('lodash');
const path = require('path');
const randomstring = require("randomstring");
const Storage = require('../modules/storage');


async function show(req, res, next) {
  debug('Enter show method!');
  try {
    const result = await models.Setting.findOne();
    if (!_.isNull(result)) {
      result.global = JSON.parse(result.global);
    }

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}


async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    name: 'nullable|string|min:1',
    title: 'nullable|string|min:1',
    description: 'nullable|string|min:1',
    keywords: 'nullable|string|min:1',
    aboutUs: 'nullable|string|min:1',
    connectUs: 'nullable|string|min:1',
    agreement: 'nullable|string|min:1',
    file: 'nullable|array',
    'file.*': 'required_if:file|file|image'
  };
  const input = validateHelper.pick(req.body, rules, ['file.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const setting = await models.Setting.findOne({transaction: t});
    if (_.isNull(setting)) {
      throw new MainError('common', 'notFound');
    }
    const g = JSON.parse(setting.global);
    await setting.updateAttributes({global: JSON.stringify(_.omit(g, ['file']))}, {transaction: t});
    await t.commit();
    if (_.isNil(input.file)) {
      return show(req, res, next);
    } else {
      req.params.settingId = setting.id;
      return uploadLogo(req, res, next);
    }
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function uploadLogo(req, res, next) {
  debug('ENTER upload logo method!');

  const rules = {
    file: 'required|array',
    'file.*': 'file|image'
  };
  const input = validateHelper.pick(req.body, rules, ['file.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    const setting = await models.Setting.findOne({
      where: {
        id: req.params.settingId
      },
      transaction: t
    });
    if (_.isNull(setting)) {
      throw new MainError('common', 'notFound');
    }

    const g = JSON.parse(setting.global);
    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].mimetype.substring(input.file[0].mimetype.indexOf('/') + 1)).toLowerCase();
    const cloundPath = `uploads/setting/${setting.id}/image/${fileKey}.${extname}`;
    await Storage.disk('local').put(input.file[0].path, cloundPath);
    await Storage.disk('local').delete(g.path);

    // 更新
    g.key = fileKey;
    g.extension = extname.substring(1);
    g.path = cloundPath;
    await setting.updateAttributes({global: JSON.stringify(g)}, {transaction: t});
    await t.commit();

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

module.exports = {
  show,
  update
};


