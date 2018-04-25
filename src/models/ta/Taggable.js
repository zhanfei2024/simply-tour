'use strict';

// Library

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Taggable', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tagId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    taggableId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    schema: 'ta',
    charset: 'utf8',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      { fields: ['type', 'taggableId'] },
    ],
    hooks: {},
    getterMethods: {},
    setterMethods: {},
    defaultScope: {
      include: [
        { model: sequelize.models.Tag, as: 'tag' },
      ],
    },
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.Tag, {
      targetKey: 'id',
      foreignKey: 'tagId',
      onDelete: 'cascade',
      as: 'tag',
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    if (res.tag !== null) {
      this.setDataValue('name', res.tag.name);
      this.setDataValue('slug', res.tag.slug);
    }

    // hide field
    delete res.type;
    delete res.taggableId;
    delete res.tagId;
    delete res.tag;
    delete res.id;

    return res;
  };
  return Model;
};
