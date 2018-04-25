'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('AuthenticationProvider', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    authenticationProviderTypeId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    thirdPartId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    schema: 'public',
    charset: 'utf8',
    paranoid: true,
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {fields: ['authenticationProviderTypeId', 'id']},
    ],
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeUser() {
        return {
          include: {
            model: sequelize.models.User, as: 'user'
          }
        }
      }
    },
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.AuthenticationProviderType, {
      targetKey: 'id',
      foreignKey: 'authenticationProviderTypeId',
      onDelete: 'restrict',
      as: 'type',
    });

    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'user',
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
