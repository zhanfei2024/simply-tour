'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('RouteDetailsItem', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    routeDetailsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      commit: "线路详情ID"
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
      commit: "显示第几天数据，也是排序内容"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      commit: "线路特色"
    },
    scheduling: {
      type: DataTypes.TEXT,
      allowNull: true,
      commit: "行程安排"
    },
    breakfast: {
      type: DataTypes.STRING,
      allowNull: true,
      commit: "早餐"
    },
    lunch: {
      type: DataTypes.STRING,
      allowNull: true,
      commit: "中餐"
    },
    dinner: {
      type: DataTypes.STRING,
      allowNull: true,
      commit: "晚餐"
    },
    lodge: {
      type: DataTypes.STRING,
      allowNull: true,
      commit: "住宿"
    },
    traffic: {
      type: DataTypes.STRING,
      allowNull: true,
      commit: "交通"
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
    Model.belongsTo(models.RouteDetails, {
      targetKey: 'id',
      foreignKey: 'routeDetailsId',
      onDelete: 'cascade',
      as: 'routeDetails'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
