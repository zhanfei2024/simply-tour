'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('RouteDestination', {
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
    destinationId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      commit: "目的地"
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

    Model.belongsTo(models.Location, {
      targetKey: 'id',
      foreignKey: 'destinationId',
      onDelete: 'cascade',
      as: 'destination'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
