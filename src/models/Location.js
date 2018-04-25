'use strict';

// Library
const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Location', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    depth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isOverseas: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否是境外景点'
    },
    isHot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '热门景点'
    }
  }, {
    schema: 'public',
    charset: 'utf8',
    paranoid: true,
    timestamps: false,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeLocation() {
        return {
          include: [{
            model: sequelize.models.Location, as: 'children',
          }]
        }
      }
    },
    hierarchy: {
      freezeTableName: true,
      camelThrough: true,
      as: 'parent',
      levelFieldName: 'depth'
    }
  });

  // Class Method
  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };
  Model.associate = function (models) {
    Model.hasMany(models.Location, {
      foreignKey: 'parentId',
      as: 'locations',
    });

    Model.belongsToMany(models.Route, {
      foreignKey: 'destinationId',
      through: {model: models.RouteDestination, as: 'routeDestination'},
      as: 'route'
    });
  };

  // Instance Method
  Model.prototype.toJSON = function () {
    return this.dataValues;
  };
  return Model;
};
