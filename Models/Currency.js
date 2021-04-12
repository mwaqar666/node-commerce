const User = require('./User');

const Currency = class extends BaseModel {}

Currency.init({
    id: {
        type: DT.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    name: {
        type: DT.STRING, allowNull: false,
    },
    shortName: {
        type: DT.STRING, allowNull: false,
    },
    symbol: {
        type: DT.STRING, allowNull: false,
    },
    status: {
        type: DT.BOOLEAN, defaultValue: false,
    },
    deleted_by: {
        type: DT.BIGINT.UNSIGNED, allowNull: true, defaultValue: null, onDelete: 'SET NULL', references: { model: User, key: 'id' },
    },
    created_by: {
        type: DT.BIGINT.UNSIGNED, allowNull: true, defaultValue: null, onDelete: 'SET NULL', references: { model: User, key: 'id' },
    },
    updated_by: {
        type: DT.BIGINT.UNSIGNED, allowNull: true, defaultValue: null, onDelete: 'SET NULL', references: { model: User, key: 'id' },
    },
    deleted_at: {
        type: DT.DATE, allowNull: true
    }
}, {
    dbInstance, tableName: 'currencies', createdAt: 'created_at', updatedAt: 'updated_at',
});

module.exports = Currency;