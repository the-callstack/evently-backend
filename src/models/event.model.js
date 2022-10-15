'use strict';


const createEventModel = (sequelize, DataTypes) => {


    return sequelize.define('Event', {
        eventType: {
            type: DataTypes.ENUM('birthday', 'wedding'),//to be discussed
            allowNull: false
        }
    });


}


module.exports = createEventModel;