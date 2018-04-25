'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      commit: "订单ID"
    },
    itemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      commit: "商品ID"
    },
    num: {
      type: DataTypes.INTEGER,
      allowNull: true,
      commit: "商品购买数量"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      commit: "商品标题"
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      commit: "商品单价"
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      commit: "商品总金额"
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
    scopes: {}
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };


  Model.associate = function (models) {
    Model.belongsTo(models.Order, {
      targetKey: 'id',
      foreignKey: 'orderId',
      onDelete: 'cascade',
      as: 'order'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
