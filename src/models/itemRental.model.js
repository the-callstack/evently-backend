'use strict';

const createItemRentalTable = (sequelize, DataTypes) => sequelize.define('CreateItemRentalTable', {
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
module.exports = createItemRentalTable;
