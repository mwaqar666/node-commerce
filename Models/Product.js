const Sequelize = require('sequelize');
const sequelize = require(pathGenerator.utilsPath('database'));

class Product extends Sequelize.Model {}

Product.init({
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
    description: {
        type: Sequelize.TEXT, allowNull: false, defaultValue: ''
    },
    regularPrice: {
        type: Sequelize.DECIMAL(8, 2).UNSIGNED, allowNull: false,
    },
    discountPrice: {
        type: Sequelize.DECIMAL(8, 2).UNSIGNED, allowNull: false, defaultValue: 0.00
    },
    quantity: {
        type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
    },
    length: {
        type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
    },
    width: {
        type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
    },
    height: {
        type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
    },
    weight: {
        type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
    },
    featured: {
        type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 0,
    },
    sale: {
        type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 0,
    },
    status: {
        type: Sequelize.TINYINT.UNSIGNED, allowNull: false, defaultValue: 0,
    }
}, {
    sequelize, tableName: 'products'
});

module.exports = Product;