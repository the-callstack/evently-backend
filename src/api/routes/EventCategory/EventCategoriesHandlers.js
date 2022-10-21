"use strict";

const { saleItemCollection, rentalItemsCollection } = require("../../../models");

const checkSaleItemCategory = async(req, res, next) => {
  const { id } = req.body;
  const availableRental = [];

    try {
      const rentalItems = await rentalItemsCollection.findRentalItemsByCatId(id);
      const rentalItemsWithTrackerId = rentalItems.filter(item => item.trackerId);
      const rentalItemsWithoutTrackerId = rentalItems.filter(item => !item.trackerId);
  
      for(let i = 0;i<rentalItemsWithTrackerId.length;i++){
        if(rentalItemsWithTrackerId[i].trackers.quantity){
            availableRental.push(rentalItemsWithTrackerId[i]);
        }
      }
      const saleItems = await saleItemCollection.findSaleItemsByCatId(id);
      const filteredSaleItems =saleItems.filter(item => item.quantity);
  
      let result = {
        rentalItemsWithTrackerId,
        rentalItemsWithoutTrackerId,
        filteredSaleItems
      }
    res.status(200).json(result);
  } catch (e) {
   next(e.message);
  }

}


module.exports = {
  checkSaleItemCategory
}
