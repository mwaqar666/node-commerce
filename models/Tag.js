const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/database');

class Tag extends Model {}

Tag.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    slug: {
        type: DataTypes.STRING, allowNull: false, unique: true,
    },
    name: {
        type: DataTypes.STRING, allowNull: false,
    },
}, {
    sequelize, tableName: 'tags'
});

module.exports = Tag;