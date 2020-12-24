const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

class Product extends Sequelize.Model {}

Product.init({
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
    description: {
        type: Sequelize.TEXT, allowNull: false, defaultValue: ''
    },
    height: {
        type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
    },
    width: {
        type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
    },
    length: {
        type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
    },
    weight: {
        type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
    },
}, {
    sequelize, tableName: 'products'
});

module.exports = Product;