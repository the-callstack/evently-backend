'use strict'

const { DataTypes, Sequelize, DATABASE_URL, sequelizeOption } = require("../config")
const createItemSaleTable = require('./itemSale.model')
const createItemRentalTable = require('./itemRental.model')

const createOrderTable = require('./order.model')


const sequelize = new Sequelize(
    DATABASE_URL,
    // sequelizeOption
)


const itemSaleModel = createItemSaleTable(sequelize, DataTypes);
const itemRentalModel = createItemRentalTable(sequelize, DataTypes);
const orderModel = createOrderTable(sequelize, DataTypes);








module.exports = {
    sequelize,
    itemSale,
    itemRental,
    order
}
