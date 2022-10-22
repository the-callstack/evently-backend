'use strict';


const createEventModel = (sequelize, DataTypes) => {


    return sequelize.define('Event', {
        eventType: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        eventImgPath: {
            type: DataTypes.TEXT
        },
        eventImgName: {
            type: DataTypes.STRING
        }
    });


};


module.exports = createEventModel;