const Sequelize = require('sequelize');
const sequelize = require(pathGenerator.utilsPath('database'));

class Category extends Sequelize.Model {}

Category.init({
    id: {
        type: Sequelize.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    slug: {
        type: Sequelize.STRING, allowNull: false, unique: true,
    },
    name: {
        type: Sequelize.STRING, allowNull: false,
    },
    image: {
        type: Sequelize.STRING, allowNull: false,
    },
    status: {
        type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 0,
    }
}, {
    sequelize, tableName: 'categories'
});

module.exports = Category;