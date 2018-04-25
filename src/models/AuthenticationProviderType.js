'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('AuthenticationProviderType', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    schema: 'public',
    charset: 'utf8',
    paranoid: true,
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {fields: ['id', 'code']}
    ],
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {}
  });

  Model.initSeed = function () {
    const data = [
      {name: 'YOOV', code: 'yoov', default: true},
      {name: 'Facebook', code: 'facebook', default: true},
      {name: 'Google', code: 'google', default: true},
    ];
    return Model.bulkCreate(data, {returning: true});
  };


  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field
    return res;
  };


  return Model;
};
