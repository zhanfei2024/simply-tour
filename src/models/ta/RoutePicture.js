'use strict';

const commonConfig = require('../../config/common');
const Storage = require('../../modules/storage');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('RoutePicture', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    routeId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    schema: 'ta',
    charset: 'utf8',
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    hooks: {
      async afterDestroy(instance) {
        await Storage.disk('local').delete(`/uploads/route/${instance.routeId}/picture/${instance.key}`);
      }
    },
    getterMethods: {},
    setterMethods: {},
  });

  // Class Method
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
  };
  // Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;
    let url = `${commonConfig.sourceUrl}/route/${res.routeId}/picture/${res.key}/original.${res.extension}`;
    this.setDataValue('url', url);
    // hide field
    delete res.key;
    return res;
  };
  return Model;
};

