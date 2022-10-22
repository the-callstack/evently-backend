"use strict";

const createCategoryModel = (sequelize, DataTypes) => {


  return sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    catImgPath: {
      type: DataTypes.TEXT
    },
    catImgName: {
      type: DataTypes.STRING
    }
  });


};

module.exports = createCategoryModel;
