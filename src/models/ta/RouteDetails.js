'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('RouteDetails', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    routeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      commit: "线路ID"
    },
    type: {
      type: DataTypes.ENUM('content', 'time'),
      allowNull: false,
      commit: "行程安排类型"
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: true,
      commit: "天"
    },
    night: {
      type: DataTypes.INTEGER,
      allowNull: true,
      commit: "晚"
    },
    feature: {
      type: DataTypes.TEXT,
      allowNull: false,
      commit: "线路特色"
    },
    schedule: {
      type: DataTypes.TEXT,
      allowNull: true,
      commit: "行程安排"
    },
    cost: {
      type: DataTypes.TEXT,
      allowNull: false,
      commit: "费用说明"
    },
    notice: {
      type: DataTypes.TEXT,
      allowNull: false,
      commit: "预订须知"
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true
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
    Model.belongsTo(models.Route, {
      targetKey: 'id',
      foreignKey: 'routeId',
      onDelete: 'cascade',
      as: 'route'
    });

    Model.hasMany(models.RouteDetailsItem, {
      foreignKey: 'routeDetailsId',
      onDelete: 'cascade',
      as: 'item'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
