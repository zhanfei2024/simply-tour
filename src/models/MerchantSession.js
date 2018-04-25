'use strict';

// Library
const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('MerchantSession', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    merchantId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    agent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastUsedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    schema: 'public',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {fields: ['merchantId', 'token']}
    ],
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeMerchant: function () {
        return {
          include: [
            {
              model: sequelize.models.Merchant, as: 'merchant',
            }
          ]
        };
      },
    },
  });


  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.Merchant, {
      targetKey: 'id',
      foreignKey: 'merchantId',
      onDelete: 'cascade',
      as: 'merchant'
    });
  };

  Model.prototype.toJSON = function () {
    let res = this.dataValues;

    // hide field
    delete res.password;

    return res;
  };

  return Model;
};
