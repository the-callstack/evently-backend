'use strict';


const { DataTypes, Sequelize, DATABASE_URL, sequelizeOption } = require("../config")

const createItemSaleModel = require('./itemSale.model')
const createItemRentalModel = require('./itemRental.model')
const createOrderModel = require('./order.model')
const createCategoryModel = require("./category.model");
const createEventModel = require("./event.model");
const createProviderModel = require('./provider.model');
const createClientModel = require('./client.model');
const createOrderDetailsModel = require('./orderDetails.model')
const createStoreModel = require('./store.model')
const createRentalTrackingModel = require('./rentalTracking.model');

const sequelize = new Sequelize(
  DATABASE_URL
  // sequelizeOption
);


const rentalTrackingmodel = createRentalTrackingModel(sequelize, DataTypes)
const storeModel = createStoreModel(sequelize, DataTypes)
const orderDetailsModel = createOrderDetailsModel(sequelize, DataTypes)
const saleItemModel = createItemSaleModel(sequelize, DataTypes);
const rentalItemModel = createItemRentalModel(sequelize, DataTypes);
const orderModel = createOrderModel(sequelize, DataTypes);
const eventModel = createEventModel(sequelize, DataTypes);
const categoryModel = createCategoryModel(sequelize, DataTypes);
const providerModel = createProviderModel(sequelize, DataTypes);
const clientModel = createClientModel(sequelize, DataTypes);













module.exports = {
  sequelize,
};
