'use strict';

const Client = (sequelize, DataTypes) =>
  sequelize.define('Client', {
    clientname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
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
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  });

module.exports = Client;
