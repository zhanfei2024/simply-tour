'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Bookmark', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    }
  }, {
    schema: 'ta',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    hooks: {},
    getterMethods: {},
    setterMethods: {},
    scopes: {
      includeCustomer() {
        return {
          include: [
            {
              model: sequelize.models.User, as: 'customer',
              required: false
            }
          ]
        };
      },

      includeStore() {
        return {
          include: [
            {
              model: sequelize.models.Store, as: 'store',
              required: false
            }
          ]
        };
      },
    }
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };


  Model.associate = function (models) {
    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'customer'
    });
  };


  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
