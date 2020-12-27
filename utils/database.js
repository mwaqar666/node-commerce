const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('node-commerce', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    // Use it for development environment only
    logging: false,
});

module.exports = sequelize;