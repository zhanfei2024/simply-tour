'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Permission', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    indexes: [
      {
        fields: ['name'],
        unique: true
      }
    ],
    schema: 'ta',
    charset: 'utf8',
    paranoid: true,
    timestamps: false,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    hooks: {},
    defaultScope: {},
    scopes: {}
  });

  Model.associate = function (models) {
    Model.belongsToMany(models.Role, {
      foreignKey: 'permissionId',
      through: models.PermissionRole,
      as: 'roles'
    });
  };


  // Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;
    // hide field
    return res;
  };


  return Model;
};

