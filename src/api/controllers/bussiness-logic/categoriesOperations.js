'use strict';



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
            id:[]
        }
    });
};

module.exports = {
    extractCategories
};