"use strict";

const createRentalTrackingModel = (sequelize, DataTypes) => {
  return sequelize.define("RentalTracking", {
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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

module.exports = createRentalTrackingModel;
