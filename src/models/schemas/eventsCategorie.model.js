'use strict';


const createEventCategorieModel = (sequelize, DataTypes) => {


    return sequelize.define('EventsCategory', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    });


};


module.exports = createEventCategorieModel;