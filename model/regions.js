const { Sequelize, sequelize } = require('../db');
const Region = sequelize.define('region', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }

});


module.exports = { Region }