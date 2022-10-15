"use strict";

const createOrderDetailsTable = (sequelize, DataTypes) =>
  sequelize.define("OrderDetail", {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    itemQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = createOrderDetailsTable;
