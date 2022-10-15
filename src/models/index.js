'use strict';


const { DataTypes, Sequelize, DATABASE_URL, sequelizeOption } = require("../config")

const createItemSaleTable = require('./itemSale.model')
const createItemRentalTable = require('./itemRental.model')
const createOrderTable = require('./order.model')
const createCategoryModel = require("./category.model");
const createEventModel = require("./event.model");
const createProviderModel = require('./provider.model');
const createClientModel = require('./client.model');

const sequelize = new Sequelize(
  DATABASE_URL
  // sequelizeOption
);



const itemSaleModel = createItemSaleTable(sequelize, DataTypes);
const itemRentalModel = createItemRentalTable(sequelize, DataTypes);
const orderModel = createOrderTable(sequelize, DataTypes);
const eventModel = createEventModel(sequelize, DataTypes);
const categoryModel = createCategoryModel(sequelize, DataTypes);
const providerModel = createProviderModel(sequelize, DataTypes);
const clientModel = createClientModel(sequelize, DataTypes);













module.exports = {
  sequelize,
};
