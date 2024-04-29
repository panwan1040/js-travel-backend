const { Sequelize, sequelize } = require('../db');
const Attraction = sequelize.define('attraction', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    detail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    highseason: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    province_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'provinces', 
            key: 'id'
        },
        onDelete: 'SET NULL'
    }

});


module.exports = { Attraction }