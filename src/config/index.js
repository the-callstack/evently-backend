'use strict'

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}


module.exports = {
    PORT: process.env.PORT,
    express,
    DataTypes,
    Sequelize,
    sequelizeOption
}