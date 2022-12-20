'use strict';

const { eventCollection } = require("../../../models");

const createPackage = async (eventId, budget, categories, attendance) => {
    try {
        const data = await eventCollection.populateWithNested(eventId, 'categories', ['saleItems', 'rentalItems'], categories);
        const items = data.categories.reduce((val, category) => {
            if (category.saleItems) {
                for (let item of category.saleItems)
                    val.push(item.dataValues);
            }
            if (category.rentalItems) {
                for (let item of category.rentalItems)
                    val.push(item.dataValues);
            }
            return val;
        }, []);

        const suggestedPackage = (() => {
            const pckg = {
                totalPrice: 0,
            };
            pckg.items = items.reduce((val, obj) => {
                pckg.totalPrice = +obj.price * attendance;
                val.push({
                    id: obj.id,
                    name: obj.name,
                    quantity: attendance,
                    totalPrice: obj.price * attendance,
                    price: obj.price,
                    CatName: obj.CatName,
                    imgPath: obj.imgPath
                }); 
                return val;
            }, []);
            return pckg;
        })();
        const result = {
            suggestedPackage,
        };
        return suggestedPackage;
    } catch (error) {
        throw new Error(error.message);
    }

};

module.exports = {
    createPackage
};