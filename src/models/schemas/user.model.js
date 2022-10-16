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
    birthday: {
      type: DataTypes.INTEGER
    },
    avatar: {
      type: DataTypes.TEXT
    },
    about: {
      type: DataTypes.STRING,
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
