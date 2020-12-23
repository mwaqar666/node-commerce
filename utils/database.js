const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('node-commerce', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

require(require('./path').modelPath('User'));

module.exports = sequelize;