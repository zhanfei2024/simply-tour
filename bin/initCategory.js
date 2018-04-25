#!/usr/bin/env node

// ***************************************
// CORE INIT BEGIN
// ***************************************
// path setup
global.__base = __dirname + '/../';

// Config Init
let envPath = '.env';
if (process.env.NODE_ENV !== 'production')
  envPath = `.env.${process.env.NODE_ENV || 'development'}`;

require('dotenv').config({
  path: envPath
});

// ***************************************
// CORE INIT END
// ***************************************


const debug = require('debug')('api-js:server');
const _ = require('lodash');

const models = require('../src/models');

module.exports = async function () {
  debug('START import Data!');
  try {
    let allPromise = [];

    let category = [
      {
        name: '中餐', depth: 1, order: 1
      },
      {
        name: '西餐', depth: 1, order: 2
      },
      {
        name: '甜点', depth: 1, order: 3
      },
      {
        name: '小吃', depth: 1, order: 4
      },
      {
        name: '自助', depth: 1, order: 5
      },
      {
        name: '火锅', depth: 1, order: 6
      },
      {
        name: '外卖', depth: 1, order: 7
      },
      {
        name: '饮品', depth: 1, order: 8
      }
    ];
    allPromise.push(importCategories(category, null));

    await Promise.all(allPromise);
    debug(`Imported location data!`);
    return;
  } catch (err) {
    debug(`VALUE ERROR: %j`, err);
  }

  process.exit();
};

function importCategories(data, parentId) {
  let promise = [];
  _.each(data, function (val) {
    if (parentId !== null) val.parentId = parentId;
    try {
      promise.push(
        new Promise(function (resolve, reject) {
          models.StoreCategories.create(_.omit(val, 'children')).then(function (result) {
            if (!_.isUndefined(val.children)) {
              if (val.children.length > 0) {
                return importCategories(val.children, result.id).then(function () {
                  resolve();
                });
              }
            } else {
              resolve();
            }

          });
        })
      );
    } catch (err) {
      debug(`ERROR from importCategories: %j`, err);
    }
  });
  return Promise.all(promise);
}
