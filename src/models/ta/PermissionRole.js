'use strict';

module.exports = function (sequelize) {
  const Model = sequelize.define('PermissionRole', {}, {
    schema: 'ta',
    charset: 'utf8',
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    hooks: {},
    defaultScope: {},
    scopes: {},
  });


  // Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    return res;
  };
  return Model;
};



