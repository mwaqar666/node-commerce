const Model = require('./Model');

class User extends Model {
    tableName = 'users';

    tableFields = {
        id: {
            type: 'BIGINT.UNSIGNED', primaryKey: true, autoIncrement: true, allowNull: false,
        },
        firstName: {
            type: 'STRING', allowNull: false,
        },
        middleName: {
            type: 'STRING', allowNull: true,
        },
        lastName: {
            type: 'STRING', allowNull: false,
        },
        picture: {
            type: 'STRING', allowNull: true,
        },
        username: {
            type: 'STRING', allowNull: false, unique: true,
        },
        password: {
            type: 'STRING', allowNull: false,
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
        }
    };
}

module.exports = User;