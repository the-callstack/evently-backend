"use strict";

const createRentalTrackingTable = (sequelize, DataTypes) =>
  sequelize.define("RentalTracking", {
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = createRentalTrackingTable;
  