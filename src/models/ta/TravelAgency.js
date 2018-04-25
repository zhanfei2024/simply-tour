'use strict';

const commonConfig = require('../../config/common');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('TravelAgency', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    merchantId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      commit: "商家ID"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      commit: "旅行社名称"
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      commit: "联系人"
    },
    locationId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      commit: "区域ID"
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      commit: "详细地址"
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
      commit: "logo"
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
      commit: "封面图"
    },
    businessLicense: {
      type: DataTypes.STRING,
      allowNull: true,
      commit: "营业执照"
    },
    IDFront: {
      type: DataTypes.STRING,
      allowNull: true,
      commit: "身份证正面图"
    },
    IDBack: {
      type: DataTypes.STRING,
      allowNull: true,
      commit: "身份证背面图"
    },
    view: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      commit: "浏览量"
    },
    status: {
      type: DataTypes.ENUM('close', 'failed', 'success', 'frozen', 'pending'),
      allowNull: false,
      defaultValue: 'pending',
      commit: '1.关闭，2.审核失败. 3.审核成功，4.永久冻结，5.等待审核'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    scopes: {
      includeLcation() {
        return {
          include: [
            {
              model: sequelize.models.Location, as: 'location',
              required: false
            }
          ]
        };
      }
    }
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.Merchant, {
      targetKey: 'id',
      foreignKey: 'merchantId',
      onDelete: 'cascade',
      as: 'merchant'
    });

    Model.belongsTo(models.Location, {
      targetKey: 'id',
      foreignKey: 'locationId',
      onDelete: 'RESTRICT',
      as: 'location'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field
    // 营业执照
    if (!!res.businessLicense) {
      let url = `${commonConfig.sourceUrl}/ta/${res.id}/businessLicense/${res.businessLicense}`;
      this.setDataValue('businessLicense', url);
    }
    // 封面图
    if (!!res.coverImage) {
      let url = `${commonConfig.sourceUrl}/ta/${res.id}/coverImage/${res.coverImage}`;
      this.setDataValue('coverImage', url);
    }
    // LOGO
    if (!!res.logo) {
      let url = `${commonConfig.sourceUrl}/ta/${res.id}/logo/${res.logo}`;
      this.setDataValue('logo', url);
    }
    // 身份证正面
    if (!!res.IDFront) {
      let url = `${commonConfig.sourceUrl}/ta/${res.id}/IDFront/${res.IDFront}`;
      this.setDataValue('IDFront', url);
    }
    // 身份证背面
    if (!!res.IDBack) {
      let url = `${commonConfig.sourceUrl}/ta/${res.id}/IDBack/${res.IDBack}`;
      this.setDataValue('IDBack', url);
    }


    // delete res.businessLicense;
    // delete res.IDBack;
    // delete res.IDFront;

    return res;
  };
  return Model;
};
