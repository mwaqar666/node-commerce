const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

class Category extends Sequelize.Model {}

Category.init({
    id: {
        type: Sequelize.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    slug: {
        type: Sequelize.STRING, allowNull: false, unique: true,
    },
    name: {
        type: Sequelize.STRING, allowNull: false,
    },
    image: {
        type: Sequelize.STRING, allowNull: false,
    },
}, {
    sequelize, tableName: 'categories'
});

module.exports = Category;