"use strict";

const createOrderDetailsModel = (sequelize, DataTypes) => {
  return sequelize.define("OrderDetail", {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    itemQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = createOrderDetailsModel;
