"use strict";

const { express } = require("../../../config");
const {
  isAuthorized,
} = require("../../controllers/auth-controllers/isAuthorized");
const {
  isUserVerefied,
} = require("../../controllers/auth-controllers/isUserVerefied");
const {
  getStores,
  getStoreDetalis,
  createStore,
  updateStore,
  deleteStore,
  getByVendor,
} = require("./store.controller");

const storeRoutes = express.Router();

storeRoutes.get("/store",
//  isUserVerefied,
  getStores);
storeRoutes.get("/store/:id", getStoreDetalis);
storeRoutes.get("/vendorStores/:id",
//  isUserVerefied,
getByVendor);
storeRoutes.post("/store",
//  isUserVerefied,
  createStore);
storeRoutes.put("/store/:id",
//  isUserVerefied,
  // isAuthorized,
   updateStore);

storeRoutes.delete("/store/:id",
//  isUserVerefied,
  // isAuthorized,
   deleteStore);


module.exports = {
  storeRoutes,
};
