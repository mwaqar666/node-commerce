const Sequelize = require('sequelize');
const sequelize = require(pathGenerator.utilsPath('database'));

const User = require(pathGenerator.modelPath('User'));

class Currency extends Sequelize.Model {}

Currency.init({
    id: {
        type: Sequelize.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    name: {
        type: Sequelize.STRING, allowNull: false,
    },
    shortName: {
        type: Sequelize.STRING, allowNull: false,
    },
    symbol: {
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
    sequelize, tableName: 'currencies', createdAt: 'created_at', updatedAt: 'updated_at',
});

module.exports = Currency;