const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('node-commerce', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    // Comment it for development environment only
    // logging: false,
});

module.exports = sequelize;