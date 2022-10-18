"use strict";

const createCategoryModel = (sequelize, DataTypes) => {


  return sequelize.define("Category", {
    categoryName: {
      type: DataTypes.STRING,//to be discussed
      allowNull: false,
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
