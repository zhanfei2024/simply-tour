const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('sequelize-hierarchy')(Sequelize);
// When BIGINT type digital too big,will number convert string type bug.
require('pg').defaults.parseInt8 = true;
const _ = require('lodash');

const basename = path.basename(module.filename);
const config = require('../config/database');

const debug = require('debug')('APP:MODEL');

const db = {};

config.logging = function (value) {
  if (process.env.NODE_ENV !== 'production') debug(value);
};

config.timezone = '+00:00';
// 关闭使用Op对象提醒
config.operatorsAliases = false;

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelPaths = [path.join(__dirname, 'ta'), __dirname];
_.each(modelPaths, modelPath => {
  fs
    .readdirSync(modelPath)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const model = sequelize['import'](path.join(modelPath, file));
      db[model.name] = model;
    });
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
