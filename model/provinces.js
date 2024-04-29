const { Sequelize, sequelize } = require('../db');
const Province = sequelize.define('province', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    region_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'regions', 
            key: 'id'
        },
        onDelete: 'SET NULL'
    }

});


module.exports = { Province }