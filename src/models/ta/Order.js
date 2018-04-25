'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    customerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      commit: "顾客ID"
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      commit: "餐厅ID"
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      commit: "团购券码"
    },
    payment: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      commit: "实付金额，精确到小数"
    },
    paymentType: {
      type: DataTypes.ENUM('online_payment', 'cash_on_delivery'),
      allowNull: true,
      defaultValue: 'online_payment',
      commit: "支付类型：在线支付，货到付款"
    },
    status: {
      type: DataTypes.ENUM('unpaid', 'paid', 'success', 'close'),
      allowNull: false,
      defaultValue: 'unpaid',
      commit: '1.未付款，2.已付款. 3.交易成功，4.交易关闭'
    },
    paymentTime: {
      type: DataTypes.DATE,
      allowNull: true,
      commit: "付款时间"
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
      commit: "付款时间"
    },
    closeTime: {
      type: DataTypes.DATE,
      allowNull: true,
      commit: "付款时间"
    },
    isOpinion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      commit: "是否评价"
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      commit: "是否使用该券"
    },
    useTime: {
      type: DataTypes.DATE,
      allowNull: true,
      commit: "使用时间"
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    schema: 'ta',
    charset: 'utf8',
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    hooks: {},
    getterMethods: {},
    setterMethods: {},
    scopes: {
      includeOrderItem() {
        return {
          include: {
            model: sequelize.models.OrderItem, as: 'orderItem',
            required: false,
            include:{
              model: sequelize.models.Combo, as: 'combo',
              required: false,
              include: [{
                attributes: ['id','title'],
                model: sequelize.models.ComboUnit, as: 'comboUnit',
                required: false,
                include: [{
                  attributes: ['id','number'],
                  model: sequelize.models.ComboUnitItem, as: 'items',
                  include: {
                    attributes: ['dishName', 'price'],
                    model: sequelize.models.Dishes, as: 'dishes',
                    where: {
                      isSale: true
                    },
                    required: false
                  },
                  required: false
                }]
              }]
            }
          }
        }
      }
    }
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'customerId',
      onDelete: 'cascade',
      as: 'customer'
    });

    Model.hasOne(models.OrderItem, {
      foreignKey: 'orderId',
      onDelete: 'cascade',
      as: 'orderItem'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
