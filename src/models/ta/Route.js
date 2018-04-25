'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Route', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    taId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      commit: "旅行社ID"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      commit: "線路標題"
    },
    type: {
      type: DataTypes.ENUM('domestic', 'abroad'),
      allowNull: false,
      commit: "線路類型"
    },
    status: {
      type: DataTypes.ENUM('close', 'failed', 'success', 'frozen', 'pending'),
      allowNull: false,
      defaultValue: 'pending',
      commit: '1.关闭，2.审核失败. 3.审核成功，4.永久冻结，5.等待审核'
    },
    natures: {
      type: DataTypes.ENUM('team', 'self'),
      allowNull: false,
      commit: "產品性質"
    },
    setOutId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 38,
      commit: "出發城市"
    },
    adultPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      commit: '成人價格'
    },
    childPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      commit: "兒童價格"
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
      commit: "開始时间"
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
      commit: "結束时间"
    },
    isActived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      commit: "是否可用"
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
    scopes: {
      includeSetOutCity: function () {
        return {
          include: [
            {
              model: sequelize.models.Location, as: 'setOutCity',
              attributes: ['id', 'name']
            }
          ]
        };
      },

      includeTravel: function () {
        return {
          include: [
            {
              attributes: ['title', 'phone', 'logo'],
              model: sequelize.models.TravelAgency, as: 'travel',
              required: false,
            }
          ]
        };
      },

      includeDestinations: function () {
        return {
          include: [
            {
              model: sequelize.models.Location, as: 'destinations',
              required: false,
            }
          ]
        };
      },

      includeSetOut: function () {
        return {
          include: [
            {
              model: sequelize.models.SetOut, as: 'setOut',
              required: false,
            }
          ]
        };
      },

      includeDetails: function () {
        return {
          include: [
            {
              model: sequelize.models.RouteDetails, as: 'details',
              required: false,
              include: [{
                model: sequelize.models.RouteDetailsItem, as: 'item',
                required: false,
              }]
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
    Model.belongsTo(models.TravelAgency, {
      targetKey: 'id',
      foreignKey: 'taId',
      onDelete: 'cascade',
      as: 'travel'
    });

    Model.belongsTo(models.Location, {
      targetKey: 'id',
      foreignKey: 'setOutId',
      onDelete: 'cascade',
      as: 'setOutCity'
    });

    Model.belongsToMany(models.Location, {
      foreignKey: 'routeId',
      otherKey: 'destinationId',
      through: {model: models.RouteDestination, as: 'routeDestination'},
      as: 'destinations'
    });

    Model.belongsToMany(models.SetOut, {
      foreignKey: 'routeId',
      otherKey: 'setOutId',
      through: {model: models.RouteSetOut, as: 'routeSetOut'},
      as: 'setOut'
    });

    Model.hasOne(models.RouteDetails, {
      foreignKey: 'routeId',
      onDelete: 'cascade',
      as: 'details'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
