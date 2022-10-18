'use strict';


const createEventModel = (sequelize, DataTypes) => {


    return sequelize.define('Event', {
        eventType: {
            type: DataTypes.ENUM('birthday', 'wedding'),//TODO
            allowNull: false
        },
        eventImgPath: {
            type: DataTypes.TEXT
        },
        eventImgName: {
            type: DataTypes.STRING
        }
    });


}


module.exports = createEventModel;