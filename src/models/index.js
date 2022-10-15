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
  DATABASE_URL,
  sequelizeOption
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


providerModel.hasMany(storeModel, { as: 'stores' })
storeModel.belongsTo(providerModel)

storeModel.hasMany(saleItemModel, { as: 'saleItems' })
saleItemModel.belongsTo(storeModel)

storeModel.hasMany(rentalItemModel, { as: 'rentalItems' })
rentalItemModel.belongsTo(storeModel)

rentalItemModel.hasMany(rentalTrackingmodel, { as: 'trackers' })
rentalTrackingmodel.belongsTo(rentalItemModel)

categoryModel.hasMany(saleItemModel, { as: 'saleItems' })
saleItemModel.belongsTo(categoryModel)

categoryModel.hasMany(rentalItemModel, { as: 'rentalItems' })
rentalItemModel.belongsTo(categoryModel)

clientModel.hasMany(orderModel, { as: 'orders' })
orderModel.belongsTo(clientModel)

orderModel.hasMany(orderDetailsModel, { as: 'details' })
orderDetailsModel.belongsTo(orderModel)

saleItemModel.hasMany(orderDetailsModel, { as: 'orders' })
orderDetailsModel.belongsTo(saleItemModel)

rentalItemModel.hasMany(orderDetailsModel, { as: 'orders' })
orderDetailsModel.belongsTo(rentalItemModel)

eventModel.belongsToMany(categoryModel, { as: 'categories', through: 'EventsCategory' })
categoryModel.belongsToMany(eventModel, { as: 'event', through: 'EventsCategory' })













module.exports = {
  sequelize,
};
