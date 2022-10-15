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
    DATABASE_URL: process.env.DATABASE_URL,
    express,
    DataTypes,
    Sequelize,
    sequelizeOption
}