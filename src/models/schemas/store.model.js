"use strict";

const createStoreModel = (sequelize, DataTypes) => {
  return sequelize.define("Store", {
    storeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logoPath: {
      type: DataTypes.TEXT
    },
    logoName: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.ENUM(
        'irbid',
        'mafraq',
        'jerash',
        'ajloun',
        'amman',
        'zarqa',
        'balqa',
        'madaba',
        'karak',
        'aqaba',
        'maan',
        'tafilah'
      ),
      defaultValue: 'amman',
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

}

module.exports = createStoreModel;
