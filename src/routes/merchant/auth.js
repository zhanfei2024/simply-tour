// debug
const debug = require('debug')('APP:MERCHANT_AUTH');

// model
const models = require('../../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');
const randomstring = require("randomstring");
const moment = require("moment");

// method
const jobs = require('../../jobs');
const rateLimitMethod = require('../../methods/RateLimitMethod');
const YunpianSMSChannel = require('../../notifications/channels/YunpianSMSChannel');
const SMS = new YunpianSMSChannel();

// jwt
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/auth');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategyOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: jwtConfig.secret,
  issuer: jwtConfig.issuer,
  audience: 'ta.com',
  algorithms: 'HS256',
  expiresIn: 10080, // minutes
};

function passportJwtStrategy(options = {}) {
  return new JwtStrategy(_.extend(JwtStrategyOption, options), async (jwtPayload, done) => {
    try {
      const result = await models.Merchant.findOne({where: {id: jwtPayload.subjectId, isActive: true}});
      if (result === null) return done(null, false);
      return done(null, result);
    } catch (err) {
      return done(err, false);
    }
  });
}


/**
 * 检查用户是否注册。
 * 1.如果用户存在，next 输入密码
 * 2.如果用户不存在，next 直接输入验证码，然后输入密码。
 * @returns boolean
 */
async function checkMerchantIsExists(req, res, next) {
  debug('ENTER check merchant is exists methods!');

  const rules = {
    phone: 'required|string|min:8|max:11'
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
        phone: input.phone
      },
      transaction: t
    });

    if (_.isNil(merchant)) {
      return res.return({status: false}); // 用户不存在可以注册
    } else {
      return res.return({status: true});  // 用户已存在可以登入或忘记密码
    }
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

/**
 * 用户存在 直接登入用户
 */
async function login(req, res, next) {
  debug('Enter login method!');

  const rules = {
    phone: 'required|string|min:8|max:11',
    password: 'required|string|min:6',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    // 查找商家用户
    const result = await models.Merchant.findOne({
      where: {
        phone: input.phone,
        isActive: true
      },
      transaction: t
    });
    if (_.isNull(result)) {
      throw new MainError('auth', 'doNotHaveAccount');
    }

    const matchPassword = result.validatePassword(input.password);
    if (matchPassword === false) throw new MainError('auth', 'emailOrPasswordIncorrect');

    const token = jwt.sign({type: 'merchant', subjectId: result.id}, jwtConfig.secret, {
      algorithm: JwtStrategyOption.algorithms,
      issuer: JwtStrategyOption.issuer,
      audience: JwtStrategyOption.audience,
      expiresIn: `${JwtStrategyOption.expiresIn}m`
    });

    const refreshToken = randomstring.generate(64);
    await models.MerchantSession.create({
      merchantId: result.id,
      token: refreshToken,
      agent: req.headers['user-agent'],
      ip: req.ip,
      lastUsedAt: new Date()
    }, {transaction: t});

    await rateLimitMethod.reset(`publicLoginLimit:${req.ip}`);
    await t.commit();

    return res.item({
      tokenType: 'JWT',
      accessToken: token,
      expiresIn: JwtStrategyOption.expiresIn,
      refreshToken,
    });
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

/**
 * 获取验证码
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function getCode(req, res, next) {
  debug('Enter get code method!');

  const rules = {
    phone: 'required|string|min:8|max:11',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    // 获取新的验证码，删除旧的验证码
    const oldCode = await jobs.get(input.phone);
    if (!_.isNull(oldCode)) {
      await jobs.del(input.phone);
    }

    // Verification Code
    const code = randomstring.generate({
      length: 6,
      charset: 'numeric'
    });

    // send message  【anyone】#code# is your verification code.
    //TODO 正式推广后开启
    // await SMS.send({phone: input.areaCode + input.phone, message: `【anyone】${code} is your verification code.`});

    // store into redis
    await jobs.set(input.phone, code, 60 * 10);
    await t.commit();

    return res.item(code);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

/**
 * 用户不存在 ，注册用户
 */
async function register(req, res, next) {
  debug('Enter register method!');

  const rules = {
    phone: 'required|string|min:8|max:11',
    password: 'required|min:6|max:16|string',
    code: 'required|min:6|string'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    // 验证码校对
    if ((await jobs.get(input.phone)) !== input.code) throw new MainError('sms', 'codeError');

    const result = await models.Merchant.findOne({
      where:
        {
          phone: input.phone,
        }, transaction: t
    });
    if (result !== null) throw new MainError('auth', 'accountAlreadyExist');

    // 注册用户是merchant
    await models.Merchant.create(input, {transaction: t});
    await jobs.del(input.phone);
    await t.commit();

    return login(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

/**
 * 重置密码
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function resetPassword(req, res, next) {
  debug('Enter resetPassword method!');

  const rules = {
    phone: 'required|string|min:8|max:11',
    password: 'required|string|min:6|max:16',
    code: 'required|min:6|string'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();
  try {
    // 验证码校对
    if ((await jobs.get(input.phone)) !== input.code) throw new MainError('sms', 'codeError');

    const merchant = await models.Merchant.findOne({
      where: {
        phone: input.phone
      },
      transaction: t
    });
    if (_.isNull(merchant)) {
      throw new MainError('auth', 'doNotHaveAccount');
    }

    await merchant.updateAttributes({password: input.password}, {transaction: t});
    await models.MerchantSession.destroy({
      where: {
        merchantId: merchant.id
      },
      transaction: t,
    });

    // 删除redis 数据
    await jobs.del(input.phone);
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

/**
 * 更改手机号码
 */
async function changeBindingPhone(req, res, next) {
  debug('Enter change phone method!');

  const rules = {
    phone: 'required|string|min:8|max:11',
    code: 'required|string|min:6'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    // 验证码校对
    if ((await jobs.get(input.phone)) !== input.code) throw new MainError('sms', 'codeError');

    const merchant = res.locals.merchantAuth;
    await merchant.updateAttributes({phone: input.phone}, {transaction: t});
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

/**
 * 刷新TOKEN
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function refreshToken(req, res, next) {
  debug('Enter refreshToken method!');

  const rules = {
    refreshToken: 'required|string|min:40',
  };
  const input = validateHelper.pick(req.body, rules);

  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();
  try {
    const accessToken = ExtractJwt.fromAuthHeader()(req);
    const payload = jwt.decode(accessToken);

    if (payload.subjectId !== res.locals.merchantAuth.id) throw new MainError('common', 'notFound');

    const session = await models.MerchantSession.findOne({
      where: {
        merchantId: res.locals.merchantAuth.id,
        token: input.refreshToken,
      },
      transaction: t,
    });
    if (session === null) throw new MainError('auth', 'emailOrPasswordIncorrect');

    let token = jwt.sign({type: 'merchant', subjectId: session.merchantId}, jwtConfig.secret, {
      algorithm: 'HS256',
      issuer: JwtStrategyOption.issuer,
      audience: JwtStrategyOption.audience,
      expiresIn: `${JwtStrategyOption.expiresIn}m`
    });

    await session.updateAttributes({
      lastUsedAt: moment.utc().toISOString(),
    });

    await t.commit();

    return res.item({
      tokenType: 'JWT',
      accessToken: token,
      expiresIn: JwtStrategyOption.expiresIn,
    });

  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

/**
 * 验证码校对
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function checkCode(req, res, next) {
  debug('ENTER check code is exists methods!');

  const rules = {
    phone: 'required|string|min:8|max:11',
    code: 'required|string|min:1',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  try {
    if ((await jobs.get(input.phone)) !== input.code) throw new MainError('sms', 'codeError');

    return res.return();
  } catch (err) {
    return next(err);
  }

}

module.exports = {
  checkMerchantIsExists,
  login,
  getCode,
  checkCode,
  changeBindingPhone,
  register,
  resetPassword,
  refreshToken,
  passportJwtStrategy
};
