'use strict';

const createProviderModel = (sequelize, DataTypes) =>
  sequelize.define('Provider', {
    providername: {
      type: DataTypes.STRING,
      allowNull: false,
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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  });

module.exports = createProviderModel;
