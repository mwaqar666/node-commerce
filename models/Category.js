const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/database');

class Category extends Model {}

Category.init({
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
}, {
    sequelize, tableName: 'categories'
});

module.exports = Category;