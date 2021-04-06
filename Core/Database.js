class Database {
    constructor(sequelize) {
        this.sequelize = sequelize;
        this.configureDatabase();
    }

    configureDatabase() {
        this.databaseInstance = new this.sequelize.Sequelize('node-commerce', 'root', '', {
            host: 'localhost',
            dialect: 'mysql',
        });
    }

    getDatabaseInstance() {
        if (! this.databaseInstance) {
            this.configureDatabase();
        }

        return this.databaseInstance;
    }
}

module.exports = new Proxy(Database, {
    construct(target, argArray) {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new target(...argArray);
        return this.instance;
    }
});