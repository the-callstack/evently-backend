'use strict';


const createEventModel = (sequelize, DataTypes) => {

    return sequelize.define('Event', {
        eventType: {
            type: DataTypes.ENUM('birthday', 'wedding'),
            allowNull: false
        }
    });
}


module.exports = createEventModel;