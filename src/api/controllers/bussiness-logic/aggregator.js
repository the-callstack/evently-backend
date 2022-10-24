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
                mfa9ale: "اسعارنا زي أسعار السوق وأحسن، و خذ لفة تنوًر"
            };
            pckg.items = items.reduce((val, obj) => {
                pckg.totalPrice = +obj.price * attendance;
                val.push({
                    item: obj.name,
                    quantity: attendance,
                    price: obj.price * attendance
                });
                return val;
            }, []);
            return pckg;
        })();
        const result = {
            suggestedPackage,
        };
        return result;
    } catch (error) {
        throw new Error(error.message);
    }

};

module.exports = {
    createPackage
};