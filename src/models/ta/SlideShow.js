'use strict';

const commonConfig = require('../../config/common');
const Storage = require('../../modules/storage');
const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('SlideShow', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    taId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('systems,travel'),
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    schema: 'ta',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    hooks: {
      async afterDestroy(instance) {
        if (!_.isNil(instance.taId)) {
          await Storage.disk('local').delete(`uploads/ta/${instance.taId}/slide/image/${instance.picture}`);
        } else {
          await Storage.disk('local').delete(`uploads/slide/image/${instance.picture}`);
        }
      },
    },
    defaultScope: {},
    scopes: {},
  });

  // Class Method
  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
  };

  // Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    if (!_.isNull(res.picture)) {
      let imageUrl = null;
      if (!_.isNil(res.taId)) {
        imageUrl = `${commonConfig.sourceUrl}/ta/${res.taId}/slide/image/${res.picture}`;
      } else {
        imageUrl = `${commonConfig.sourceUrl}/slide/image/${res.picture}`;
      }
      this.setDataValue('imageUrl', imageUrl);
    }

    return res;
  };
  return Model;
};

