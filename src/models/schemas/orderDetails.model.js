"use strict";

const createOrderDetailsModel = (sequelize, DataTypes) => {
  return sequelize.define("OrderDetail", {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
  });
};

module.exports = createOrderDetailsModel;
