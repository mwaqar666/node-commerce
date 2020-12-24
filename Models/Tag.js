const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

class Tag extends Sequelize.Model {}

Tag.init({
    id: {
        type: Sequelize.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    slug: {
        type: Sequelize.STRING, allowNull: false, unique: true,
    },
    name: {
        type: Sequelize.STRING, allowNull: false,
    },
}, {
    sequelize, tableName: 'tags'
});

module.exports = Tag;