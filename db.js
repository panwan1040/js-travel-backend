const Sequelize = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/SQLattraction',
    logging: console.log,
});
console.log(process.env.DB_USERNAME);
// const dbUrl = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@node59700-back-end.proen.app.ruk-com.cloud:11693/Gallery`;
// const sequelize = new Sequelize(dbUrl);
module.exports = { Sequelize, sequelize };