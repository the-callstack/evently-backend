'use strict';

const createItemRentalModel = (sequelize, DataTypes) => sequelize.define('RentalItem', {
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
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
module.exports = createItemRentalModel;
