const User = require('./User');
const Model = require('./Model');

class Category extends Model {
    tableName = 'categories';

    attributes = {
        id: {
            type: 'BIGINT.UNSIGNED', primaryKey: true, autoIncrement: true, allowNull: false,
        },
        parent_id: {
            type: 'BIGINT.UNSIGNED', allowNull: true, defaultValue: null, onDelete: 'SET NULL', references: { model: Category, key: 'id' },
        },
        slug: {
            type: 'STRING', allowNull: false, unique: true,
        },
        name: {
            type: 'STRING', allowNull: false,
        },
        image: {
            type: 'STRING', allowNull: true,
        },
        status: {
            type: 'BOOLEAN', defaultValue: false,
        },
        deleted_by: {
            type: 'BIGINT.UNSIGNED', allowNull: true, defaultValue: null, onDelete: 'SET NULL', references: { model: User, key: 'id' },
        },
        created_by: {
            type: 'BIGINT.UNSIGNED', allowNull: true, defaultValue: null, onDelete: 'SET NULL', references: { model: User, key: 'id' },
        },
        updated_by: {
            type: 'BIGINT.UNSIGNED', allowNull: true, defaultValue: null, onDelete: 'SET NULL', references: { model: User, key: 'id' },
        },
        deleted_at: {
            type: 'DATE', allowNull: true
        },
    };
}

module.exports = Category;