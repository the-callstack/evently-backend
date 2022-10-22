'use strict';



const extractCategories = (data) => {
    return data.categories.reduce((val, item) => {
        if (item.id) {
            val.existingCategories.name.push(item.name);
        } else {
            val.newCategories.push(item);
        }
        return val;
    }, {
        newCategories: [],
        existingCategories: {
            name: []
        }
    });
};

module.exports = {
    extractCategories
};