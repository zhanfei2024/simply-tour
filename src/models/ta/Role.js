'use strict';

// library
const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Role', {
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
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    schema: 'ta',
    charset: 'utf8',
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    hooks: {},
    defaultScope: {},
    scopes: {
      includePermissions: function () {
        return {
          include: [
            {
              model: sequelize.models.Permission, as: 'permissions'
            }
          ]
        };
      },
    },
  });

  // Class Method
  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.initSeed = async function () {
    const roles = await Model.bulkCreate([
      {
        name: 'superAdmin',
      }, {
        name: 'admin',
      },
    ], {returning: true});

    let permissions = [];
    _.each(['user', 'customerAddress', 'modules', 'slideShow', 'location', 'feedback','contactUs', 'agreement', 'message','store'], function (value) {
      permissions.push({name: `${value}.index`, displayName: 'Views'});
      permissions.push({name: `${value}.create`, displayName: 'Create'});
      permissions.push({name: `${value}.update`, displayName: 'Update'});
      permissions.push({name: `${value}.destroy`, displayName: 'Delete'});
    });
    permissions = await sequelize.models.Permission.bulkCreate(permissions, {returning: true});

    //general admin
    const adminPermissionList = [];
    _.each(['user', 'customerAddress', 'modules', 'slideShow', 'location', 'feedback','contactUs', 'agreement', 'message','store'], function (value) {
      adminPermissionList.push(`${value}.index`);
      adminPermissionList.push(`${value}.create`);
      adminPermissionList.push(`${value}.update`);
      adminPermissionList.push(`${value}.destroy`);
    });

    const adminPermissions = _.filter(permissions, value => adminPermissionList.indexOf(value.name) !== -1);


    const rolePermissionPromises = [
      roles[0].setPermissions(permissions),
      roles[1].setPermissions(adminPermissions),
    ];
    return Promise.all(rolePermissionPromises);
  };


  Model.associate = function (models) {
    Model.belongsToMany(models.Permission, {
      foreignKey: 'roleId',
      through: models.PermissionRole,
      as: 'permissions'
    });

    Model.belongsToMany(models.Admin, {
      foreignKey: 'roleId',
      through: models.RoleAdmin,
      as: 'roleAdmin'
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

