'use strict'

const { DataTypes, Sequelize, DATABASE_URL, sequelizeOption } = require("../config")


const sequelize = new Sequelize(
    DATABASE_URL,
    // sequelizeOption
)

















module.exports = {
    sequelize
}
