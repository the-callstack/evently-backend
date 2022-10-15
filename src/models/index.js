'use strict';

const {
  DataTypes,
  Sequelize,
  DATABASE_URL,
  sequelizeOption,
} = require('../config');

const createProviderModel = require('./provider.model');
const createClientModel = require('./client.model');

const sequelize = new Sequelize(
  DATABASE_URL
  // sequelizeOption
);

const providerModel = createProviderModel(Sequelize, DataTypes);
const clientModel = require(Sequelize, DataTypes);

module.exports = {
  sequelize,
};
