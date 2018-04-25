'use strict';

// library

module.exports = function (sequelize) {
  const Model = sequelize.define('RoleAdmin', {}, {
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

