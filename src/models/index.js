'use strict'

const { DataTypes, Sequelize, DATABASE_URL, sequelizeOption } = require("../config");
const createCategoryModel = require("./category.model");
const createEventModel = require("./event.model");


const sequelize = new Sequelize(
    DATABASE_URL,
    // sequelizeOption
);

const eventModel = createEventModel(sequelize, DataTypes);
const categoryModel = createCategoryModel(sequelize, DataTypes);









module.exports = {
    sequelize
}
