'use strict';

const createItemSaleTable = (sequelize, DataTypes) => sequelize.define('saleItem', {
    IMG: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
module.exports = createItemSaleTable;
