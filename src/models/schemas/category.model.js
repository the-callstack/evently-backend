"use strict";

const createCategoryModel = (sequelize, DataTypes) => {
  return sequelize.define("Category", {
    categoryName: {
      type: DataTypes.ENUM("food", "drink", "furniture", "gifts", "dj"),
      allowNull: false,
    },
    catImgPath: {
      type: DataTypes.TEXT,
    },
    catImgName: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = createCategoryModel;
