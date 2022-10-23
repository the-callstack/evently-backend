'use strict';

const { categoryCollection, eventCollection } = require("../../../models");



const extractCategories = (data) => {
    return data.categories.reduce((val, item) => {
        if (item.id) {
            // val.existingCategories.name.push(item.name);
            val.existingCategories.id.push(item.id);

        } else {
            val.newCategories.push(item);
        }
        return val;
    }, {
        newCategories: [],
        existingCategories: {
            // name: [],
            id: []
        }
    });
};



const creatcat = async (Event, newCat) => {
    if (newCat) {
        const toBeAddedCategories = await categoryCollection.readAllRecordsWithCondition(newCat);
        const addedCategories = await Event.addCategories(toBeAddedCategories)

        return addedCategories
    }
}

const creatEvent = async (Cat, newEvent) => {
    if (newEvent) {
        const toBeAddedEvent = await eventCollection.readAllRecordsWithCondition(newEvent);
        const addedEvent = await Cat.addEvents(toBeAddedEvent)

        return addedEvent
    }
}
module.exports = {
    extractCategories,
    creatcat,
    creatEvent
};