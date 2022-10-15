"use strict";

const createStoreModel = (sequelize, DataTypes) => {
  return sequelize.define("Store", {
    storeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

}

module.exports = createStoreModel;
