'use strict';

const createUsertModel = (sequelize, DataTypes) =>
  sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'client', 'provider'),
      defaultValue: 'client',
      allowNull: false
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
    birthday: {
      type: DataTypes.INTEGER
    },
    avatarPath: {
      type: DataTypes.TEXT
    },
    avatarName: {
      type: DataTypes.STRING
    },
    about: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = createUsertModel;
