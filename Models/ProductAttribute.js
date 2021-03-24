const Sequelize = require('sequelize');
const sequelize = require(pathGenerator.utilsPath('database'));

const User = require(pathGenerator.modelPath('User'));

class ProductAttribute extends Sequelize.Model {}

ProductAttribute.init({
    id: {
        type: Sequelize.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    name: {
        type: Sequelize.STRING, allowNull: false,
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
    sequelize, tableName: 'product_attributes', createdAt: 'created_at', updatedAt: 'updated_at',
});

module.exports = ProductAttribute;