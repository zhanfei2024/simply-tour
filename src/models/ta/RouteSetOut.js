'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('RouteSetOut', {
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
    setOutId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      commit: "发团日期"
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

    Model.belongsTo(models.SetOut, {
      targetKey: 'id',
      foreignKey: 'setOutId',
      onDelete: 'cascade',
      as: 'setOut'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
