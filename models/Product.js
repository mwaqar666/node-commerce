const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/database');

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    slug: {
        type: DataTypes.STRING, allowNull: false, unique: true,
    },
    name: {
        type: DataTypes.STRING, allowNull: false,
    },
    image: {
        type: DataTypes.STRING, allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, allowNull: false, defaultValue: ''
    },
    height: {
        type: DataTypes.INTEGER.UNSIGNED, allowNull: false,
    },
    width: {
        type: DataTypes.INTEGER.UNSIGNED, allowNull: false,
    },
    length: {
        type: DataTypes.INTEGER.UNSIGNED, allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER.UNSIGNED, allowNull: false,
    },
}, {
    sequelize, tableName: 'products'
});

module.exports = Product;