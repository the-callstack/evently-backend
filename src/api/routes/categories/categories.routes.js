"use strict";

const { express } = require("../../../config");
const {
  isAuthorized,
} = require("../../controllers/auth-controllers/isAuthorized");
const {
  isUserVerefied,
} = require("../../controllers/auth-controllers/isUserVerefied");
const {
  getCategory,
  getCategoryDetalis,
  createCat,
  updateCategory,
  deleteCategory,
} = require("./categories.handlers");

const CategoryRouter = express.Router();

CategoryRouter.get(
  "/category",
  // isUserVerefied,
  getCategory
);
CategoryRouter.get(
  "/category/:id",
  // isUserVerefied,
  // isAuthorized,
  getCategoryDetalis
);
CategoryRouter.post(
  "/category",
  // , isUserVerefied
  // , isAuthorized
  createCat
);
CategoryRouter.put(
  "/category/:id",
  // isUserVerefied,
  // isAuthorized,
  updateCategory
);
CategoryRouter.delete(
  "/category/:id",
  // isUserVerefied,
  // isAuthorized,
  deleteCategory
);

module.exports = {
  CategoryRouter,
};
