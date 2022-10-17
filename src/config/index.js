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
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    express,
    DataTypes,
    Sequelize,
    sequelizeOption
}