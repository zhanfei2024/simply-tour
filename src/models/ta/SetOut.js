'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('SetOut', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      commit: "发团日期"
    },
    isActived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      commit: "是否启用"
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    schema: 'ta',
    charset: 'utf8',
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    hooks: {},
    getterMethods: {},
    setterMethods: {},
    scopes: {}
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };


  Model.initSeed = function () {
    const data = [
      {title: '星期一'},
      {title: '星期二'},
      {title: '星期三'},
      {title: '星期四'},
      {title: '星期五'},
      {title: '星期六'},
      {title: '星期日'},
    ];
    return Model.bulkCreate(data);
  };

  Model.associate = function (models) {
    // Model.belongsToMany(models.Route, {
    //   foreignKey: 'setOutId',
    //   through: {model: models.RouteSetOut, as: 'routeSetOut'},
    //   as: 'routeSetOut'
    // });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
