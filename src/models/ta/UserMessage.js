'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('UserMessage', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标题'
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '正文内容'
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否阅读'
    },
    publishAt: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '发布时间'
    }
  }, {
    schema: 'ta',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeUser: function () {
        return {
          include: [
            {
              attributes: ['id', 'username'],
              model: sequelize.models.User, as: 'user',
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
    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'user'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    return res;
  };

  return Model;
};
