'use strict';

const createItemSaleModel = (sequelize, DataTypes) => sequelize.define('SaleItem', {
    imgPath: {
        type: DataTypes.TEXT
    },
    imgName: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
module.exports = createItemSaleModel;
