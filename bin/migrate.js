#!/usr/bin/env node

require('../bootstrap/GlobalInit');

const debug = require('debug')('APP:BIN_MIGRATE');
const models = require('../src/models');
const initLocation = require('./initLocaiton');
const categoriesDate = require('./initCategory');

/**
 * =======
 * Command
 * =======
 *
 * update database: [create tables and columns if not exists]
 * [should not set column allowNull to false because there may be existing rows]
 * - node bin/migrate
 * - node bin/migrate update
 *
 * reset database: [drop all tables and re-create them]
 * - node bin/migrate reset
 *
 */
async function reset() {
  debug('START INIT DATABASE!');
  try {
    await models.sequelize.query('CREATE SCHEMA IF NOT EXISTS ta;', {});
    // database reset
    await models.sequelize.sync({force: 1});
    await models.Language.initSeed();
    await models.Country.initSeed();
    await models.Currency.initSeed();
    await models.Role.initSeed();
    await models.Admin.initSeed();
    await models.SetOut.initSeed();
    await models.AuthenticationProviderType.initSeed();
    await models.RoleAdmin.create({
      adminId: 1,
      roleId: 1
    });
    await initLocation();
    debug('Database has been reset!');
  } catch (err) {
    debug(err);
  }

  process.exit();
}

const Migrate = {
  reset,
};

(function () {
  const action = process.argv[2] ? process.argv[2] : 'reset';
  debug('migrate action: ' + action);
  if (!Migrate[action]) {
    debug('no such action!');
    process.exit();
  }

  Migrate[action]();
})();
