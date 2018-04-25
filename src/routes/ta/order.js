'use strict';

// core
const debug = require('debug')('APP:ORDER');

// model
const models = require('../../models');
const modelHelper = require('../../methods/model');

// library
const _ = require('lodash');
const moment = require('moment');
const randomstring = require('randomstring');

const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');
const stripeMethod = require('../../methods/stripe');


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

  if (!_.isUndefined(input.search)) {
    filter.where.id = {
      $iLike: '%' + input.search + '%'
    };
  }

  filter.order = [['createdAt', 'DESC']];
  try {
    const result = await modelHelper.findAll('Order', [], filter, ['includeOrderItem', 'includeStore']);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}


async function show(req, res, next) {
  debug('Enter show method!');

  try {
    const result = await models.Order.scope(['includeOrderItem', 'includeStore']).findById(req.params.orderId);

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}


async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    customerId: 'required|integer|min:1|exists:User,id',
    storeId: 'required|integer|min:1|exists:Store,id',
    comboId: 'required|integer|min:1|exists:Combo,id',
    num: 'required|integer|min:1',
    price: 'required|numeric|min:1',
    remark: 'nullable|string|min:1',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    // 创建订单
    input.code = randomstring.generate({
      length: 12,
      charset: '0123456789'
    });
    const order = await models.Order.create(input, {transaction: t});

    // 创建订单商品
    const combo = await models.Combo.findById(input.comboId, {transaction: t});
    let itemAttributes = {};
    itemAttributes.orderId = order.id;
    itemAttributes.itemId = combo.id;
    itemAttributes.num = input.num;
    itemAttributes.title = combo.title;
    itemAttributes.price = input.price;
    itemAttributes.totalPrice = input.price * input.num;
    await models.OrderItem.create(itemAttributes, {transaction: t});
    await t.commit();

    req.params.orderId = order.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

// 付款
async function payment(req, res, next) {
  debug('ENTER payment method!');

  const rules = {
    orderId: 'required|string|min:1|exists:Order,id',
    amount: 'required|numeric|min:1',
    customerId: 'required|integer|min:1|exists:User,id',
    paymentType: 'required|string|min:1|in:online_payment,cash_on_delivery',
    token: 'required|min:1|string',
    number: 'required|string|min:16',
    expMonth: 'required|integer|min:1|in:1,2,3,4,5,6,7,8,9,10,11,12',
    expYear: 'required|string|min:1',
    cvc: 'required|string|min:1',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const orderAttributes = {}, messageAttributes = {};

    // 不能重复付款
    // 查询用户订单
    const order = await models.Order.scope(['includeOrderItem']).findOne({
      where: {
        customerId: input.customerId,
        id: input.orderId
      },
      transaction: t
    });
    if (!_.isNull(order) && _.isEqual(order.status, 'paid')) {
      throw new MainError('order', 'can\'tDuplicatePayment');
    }

    // 付款金额应与订单金额相同
    if (!_.isEqual(+input.amount, +order.orderItem.totalPrice)) {
      throw new MainError('order', 'orderAmountError');
    }

    // Create a charge: this will charge the user's card
    await stripeMethod.gateway.charges.create({
      amount: +input.amount, // amount in cents
      currency: 'usd',
      source: input.token,
      description: 'Credit'
    });

    // 付款成功，更改订单状态
    orderAttributes.status = 'paid';
    orderAttributes.payment = input.amount;
    orderAttributes.paymentTime = moment().format('YYYY-MM-DD hh:mm:ss');
    await order.updateAttributes(orderAttributes, {transaction: t});

    messageAttributes.userId = order.customerId;
    messageAttributes.title = `你购买的${order.orderItem.title}訂單付款成功！`;
    messageAttributes.contents = `您购买的${order.orderItem.title}訂單付款成功！`;
    messageAttributes.publishAt = moment().format('YYYY-MM-DD hh:mm:ss');
    await models.UserMessage.create(messageAttributes, {transaction: t});
    await t.commit();

    req.params.orderId = order.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      if (err.rawType === 'card_error') return next(new MainError('payment', 'invalidCard'));
      return next(new MainError('payment', 'invalidPayment'));
    }

    return next(err);
  }
}

async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    orderId: 'required|integer|min:1|exists:Order,id',
    status: 'required|string|min:1|in:success,close',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    // 修改订单
    const order = await models.Order.findById(input.orderId, {transaction: t});
    if (_.isNull(order)) {
      throw new MainError('common', 'notFound');
    }

    if (_.isEqual(input.status, 'success')) {
      input.endTime = moment().format('YYYY-MM-DD HH:mm:ss');
    } else if (_.isEqual(input.status, 'close')) {
      input.closeTime = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    await order.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.orderId = order.id;
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

    const filter = {
      where: {
        customerId: req.params.customerId,
        id: req.params.orderId
      },
      transaction: t
    };
    const result = await models.Order.findOne(filter);
    if (_.isNull(result)) {
      throw new MainError('common', 'notFound');
    }

    await result.destroy({transaction: t});
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function useCode(req, res, next) {
  debug('Enter use code method!');

  const rules = {
    code: 'required|string|min:1|exists:Order,code'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    // 修改订单
    const order = await models.Order.findOne({
      where: {
        code: input.code,
        isUsed: false
      },
      transaction: t
    });
    if (_.isNull(order)) {
      throw new MainError('store', 'onlyOne');
    }

    input.useTime = moment().format('YYYY-MM-DD HH:mm:ss');
    input.isUsed = true;
    const result = await order.updateAttributes(input, {transaction: t});
    if (result.isUsed) {
      const store = await models.Store.findById(result.storeId, {transaction: t});
      await store.increment({salesVolume: 1}, {transaction: t});
    }
    await t.commit();

    req.params.orderId = order.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


module.exports = {
  index,
  show,
  create,
  payment,
  update,
  destroy,
  useCode
};

