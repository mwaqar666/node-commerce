// noinspection JSUnresolvedFunction
class Database {
    constructor(sequelize, pathVariable) {
        this.sequelize = sequelize;
        this.pathVariable = pathVariable;
        this.configureDatabase();
    }

    configureDatabase() {
        const databaseConfig = this.pathVariable.getConfigPath('database');

        this.databaseInstance = new this.sequelize.Sequelize(
            databaseConfig.database, databaseConfig.username, databaseConfig.password, {
                host: databaseConfig.host,
                dialect: 'mysql',
            }
        );
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