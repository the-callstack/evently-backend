'use strict';


const { DataTypes, Sequelize, DATABASE_URL, sequelizeOption } = require("../config")

const createItemSaleModel = require('./schemas/itemSale.model')
const createItemRentalModel = require('./schemas/itemRental.model')
const createOrderModel = require('./schemas/order.model')
const createCategoryModel = require("./schemas/category.model");
const createEventModel = require("./schemas/event.model");
const createUsertModel = require('./schemas/user.model');
const createOrderDetailsModel = require('./schemas/orderDetails.model')
const createStoreModel = require('./schemas/store.model')
const createRentalTrackingModel = require('./schemas/rentalTracking.model');

const createGenericCollections = require("../api/collections/composer");

const sequelize = new Sequelize(
  DATABASE_URL,
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
const userModel = createUsertModel(sequelize, DataTypes);


userModel.hasMany(storeModel, { as: 'stores' })
storeModel.belongsTo(userModel)

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

userModel.hasMany(orderModel, { as: 'orders' })
orderModel.belongsTo(userModel)

orderModel.hasMany(orderDetailsModel, { as: 'details' })
orderDetailsModel.belongsTo(orderModel)

saleItemModel.hasMany(orderDetailsModel, { as: 'orders' })
orderDetailsModel.belongsTo(saleItemModel)

rentalItemModel.hasMany(orderDetailsModel, { as: 'orders' })
orderDetailsModel.belongsTo(rentalItemModel)

eventModel.belongsToMany(categoryModel, { as: 'categories', through: 'EventsCategory' })
categoryModel.belongsToMany(eventModel, { as: 'event', through: 'EventsCategory' })



const userCollection = createGenericCollections(userModel)








module.exports = {
  sequelize,
  userCollection
};
