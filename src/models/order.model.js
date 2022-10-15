'use strict';

const createOrderTable = (sequelize, DataTypes) => sequelize.define('CreateOrderTable', {
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    deleveryDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.INTEGER, allowNull: false
    }
})
module.exports = createOrderTable;
