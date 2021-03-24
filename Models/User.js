const Sequelize = require('sequelize');
const sequelize = require(pathGenerator.utilsPath('database'));

class User extends Sequelize.Model {}

User.init({
    id: {
        type: Sequelize.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING, allowNull: false,
    },
    middleName: {
        type: Sequelize.STRING, allowNull: true,
    },
    lastName: {
        type: Sequelize.STRING, allowNull: false,
    },
    picture: {
        type: Sequelize.STRING, allowNull: true,
    },
    username: {
        type: Sequelize.STRING, allowNull: false, unique: true,
    },
    password: {
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
    sequelize, tableName: 'users', createdAt: 'created_at', updatedAt: 'updated_at',
});

module.exports = User;