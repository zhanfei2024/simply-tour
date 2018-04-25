'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Feedback', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: '用户'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '姓名'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '标题'
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '联系方式:phone/email'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '反馈内容',
    }
  }, {
    schema: 'ta',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {fields: ['userId']},
      {fields: ['contact']},
    ],
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeUser: function () {
        return {
          include: [
            {
              attributes: ['username', 'phone'],
              model: sequelize.models.User, as: 'user',
            },
          ]
        };
      },
    },
  });


  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'user'
    });
  };

  Model.prototype.toJSON = function () {
    let res = this.dataValues;

    return res;
  };

  return Model;
};
