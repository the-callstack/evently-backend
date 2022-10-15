"use strict";

const createStoreTable = (sequelize, DataTypes) =>{
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

module.exports = createStoreTable;
