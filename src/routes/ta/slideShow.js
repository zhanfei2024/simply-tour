'use strict';

// core
const debug = require('debug')('APP:SLIDE_SHOW');

// model
const models = require('../../models');
const modelHelper = require('../../methods/model');

// library
const _ = require('lodash');
const path = require('path');
const randomstring = require('randomstring');

const Storage = require('../../modules/storage');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');


async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    search: 'nullable|string|min:1',
    isActive: 'nullable|boolean|min:1|in:true,false',
    type: 'nullable|string|min:1|in:systems,travel',
    taId: 'nullable|integer|min:1',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter2(req.query);

  if (!_.isNil(input.search)) {
    filter.where.title = {
      $iLike: '%' + input.search + '%'
    };
  }

  if (!_.isNil(input.isActive)) {
    filter.where.isActive = input.isActive;
  }

  if (!_.isNil(input.type)) {
    filter.where.type = input.type;
  }

  if (!_.isNil(input.taId)) {
    filter.where.taId = input.taId;
  }

  filter.order = [['order', 'ASC']];
  try {
    const result = await modelHelper.findAll('SlideShow', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}


async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.slideShowId
    }
  };

  if (!_.isNil(req.params.taId)) {
    filter.where.tagId = req.params.taId;
  }

  try {
    const result = await models.SlideShow.findOne(filter);

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}


async function create(req, res, next) {
  debug('Enter create method!');

  if (!_.isNil(req.files) && !_.isEmpty(req.files.picture)) {
    req.body.picture = req.files.picture[0];
  }

  const rules = {
    taId: 'nullable|min:1|integer',
    title: 'required|string|min:1|max:250',
    link: 'nullable|string|min:1|max:250',
    picture: 'required|image',
    order: 'nullable|integer|min:1',
    isActive: 'nullable|min:1|boolean|in:true,false',
    type: 'required|min:1|string|in:systems,travel',
    remark: 'nullable|min:1|string',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    let cloudPath = null;
    const slide = await models.SlideShow.create(_.omit(input, ['picture']), {transaction: t});
    const fileKey = randomstring.generate(6);
    const extname = input.picture.mimetype.substring(input.picture.mimetype.indexOf('/') + 1).toLowerCase();
    // 根据商家与系统的不同，图片上传到不同位置
    if (!_.isNil(input.taId)) {
      cloudPath = `uploads/ta/${input.taId}/slide/image/${fileKey}.${extname}`;
    } else {
      cloudPath = `uploads/slide/image/${fileKey}.${extname}`;
    }
    await Storage.disk('local').put(input.picture.path, cloudPath);
    await slide.updateAttributes({'picture': `${fileKey}.${extname}`}, {transaction: t});
    await t.commit();

    req.params.slideShowId = slide.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function update(req, res, next) {
  debug('Enter update method!');

  if (!_.isNil(req.files) && !_.isEmpty(req.files.picture)) {
    req.body.picture = req.files.picture[0];
  }

  const rules = {
    taId: 'nullable|min:1|integer',
    title: 'nullable|string|min:1|max:250',
    link: 'nullable|string|min:1|max:250',
    picture: 'nullable|image',
    order: 'nullable|integer|min:1',
    isActive: 'nullable|min:1|boolean|in:true,false',
    type: 'nullable|min:1|string|in:systems,travel',
    remark: 'nullable|min:1|string',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    let cloudPath = null;
    const fileKey = randomstring.generate(6);
    const extname = input.picture.mimetype.substring(input.picture.mimetype.indexOf('/') + 1).toLowerCase();

    const result = await models.SlideShow.findById(req.params.slideShowId);
    if (_.isNil(result)) {
      throw new MainError('common', 'notFound');
    }
    // 根据商家与系统的不同，图片上传到不同位置
    if (!_.isNil(input.taId)) {
      cloudPath = `uploads/ta/${input.taId}/slide/image/${fileKey}.${extname}`;
    } else {
      cloudPath = `uploads/slide/image/${fileKey}.${extname}`;
    }
    // 删除旧图片
    if (!_.isNil(input.picture)) {
      if (!_.isNil(input.taId)) {
        await Storage.disk('local').delete(`uploads/ta/${input.taId}/slide/image/${result.picture}`);
      } else {
        await Storage.disk('local').delete(`uploads/slide/image/${result.picture}`);
      }
    }
    await Storage.disk('local').put(input.picture.path, cloudPath);
    input.picture = `${fileKey}.${extname}`;
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.slideShowId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();

  const filter = {
    where: {
      id: req.params.slideShowId,
    },
    transaction: t
  };

  if (!_.isNil(req.params.taId)) {
    filter.where.taId = req.params.taId;
  }

  try {
    const result = await models.SlideShow.findOne(filter);
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
  update,
  destroy
};

