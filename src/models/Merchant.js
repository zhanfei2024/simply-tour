'use strict';

// Library
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Acl = require('../modules/acl');
const imageConfig = require('../config/image');
const commonConfig = require('../config/common');
const Storage = require('../modules/Storage');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Merchant', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '姓'
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '名'
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '昵称'
    },
    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '用户头像，avatar'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '密码'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '冻结或拉黑用户'
    },
    gender: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false,
      defaultValue: 'M',
      comment: '性别'
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '生日'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '邮箱'
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    schema: 'public',
    charset: 'utf8',
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {fields: ['phone']},
    ],
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    hooks: {
      beforeCreate(instance) {
        instance.password = bcrypt.hashSync(instance.password, 10);
      },
      beforeUpdate(instance, options) {
        if (options.fields.includes('password')) instance.password = bcrypt.hashSync(instance.password, 10);
      },
      async afterDestroy(instance, options) {
        await Storage.disk('local').delete(`uploads/merchant/${instance.id}/avatar/${instance.profilePhoto}`);
      }
    },
    setterMethods: {},
    scopes: {
      includeSession() {
        return {
          include: {
            model: sequelize.models.MerchantSession, as: 'merchantSessions'
          }
        }
      },
    }
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.hasMany(models.MerchantSession, {
      targetKey: 'id',
      foreignKey: 'merchantId',
      onDelete: 'cascade',
      as: 'merchantSessions'
    });
  };

  Model.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  Model.prototype.acl = function () {
    return new Acl(this.roles);
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    if (!!res.profilePhoto) {
      let url = {};
      _.each(imageConfig.imageSizeList, function (val) {
        url['size' + val] = `${commonConfig.sourceUrl}/merchant/${res.id}/avatar/${res.profilePhoto}`
      });
      this.setDataValue('avatar', url);
    }


    // hide field
    delete res.password;

    return res;
  };

  return Model;
};
