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
    email: {
        type: Sequelize.STRING, allowNull: false,
    },
    password: {
        type: Sequelize.STRING, allowNull: false,
    }
}, {
    sequelize, tableName: 'users', modelName: 'User'
});

module.exports = User;