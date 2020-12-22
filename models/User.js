const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/database');

class User extends Model {
    fullName() {
        return [this.firstName, this.lastName].join(' ');
    }
}

User.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING, allowNull: false,
    },
    middleName: {
        type: DataTypes.STRING, allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING, allowNull: false,
    },
    email: {
        type: DataTypes.STRING, allowNull: false,
    },
    password: {
        type: DataTypes.STRING, allowNull: false,
    }
}, {
    sequelize, tableName: 'users',
});
console.log(1);

module.exports = User;