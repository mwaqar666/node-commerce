const Sequelize = require('sequelize');
const sequelize = require(pathGenerator.utilsPath('database'));

const User = require(pathGenerator.modelPath('User'));

class Category extends Sequelize.Model {}

Category.init({
    id: {
        type: Sequelize.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    parent_id: {
        type: Sequelize.BIGINT.UNSIGNED, allowNull: true, defaultValue: null, onDelete: 'CASCADE', references: { model: Category, key: 'id' },
    },
    slug: {
        type: Sequelize.STRING, allowNull: false, unique: true,
    },
    name: {
        type: Sequelize.STRING, allowNull: false,
    },
    image: {
        type: Sequelize.STRING, allowNull: true,
    },
    status: {
        type: Sequelize.BOOLEAN, defaultValue: false,
    },
    deleted_by: {
        type: Sequelize.BIGINT.UNSIGNED, allowNull: true, defaultValue: null, onDelete: 'SET NULL', references: { model: User, key: 'id' },
    },
    created_by: {
        type: Sequelize.BIGINT.UNSIGNED, allowNull: true, defaultValue: null, onDelete: 'SET NULL', references: { model: User, key: 'id' },
    },
    updated_by: {
        type: Sequelize.BIGINT.UNSIGNED, allowNull: true, defaultValue: null, onDelete: 'SET NULL', references: { model: User, key: 'id' },
    },
    deleted_at: {
        type: Sequelize.DATE, allowNull: true
    }
}, {
    sequelize, tableName: 'categories', createdAt: 'created_at', updatedAt: 'updated_at',
});

module.exports = Category;