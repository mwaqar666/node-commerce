// noinspection JSUnresolvedFunction
class Model {

    constructor(sequelize, database, coreDependentUtils, pathVariable) {
        this.sequelize = sequelize;
        this.database = database;
        this.coreDependentUtils = coreDependentUtils;
        this.pathVariable = pathVariable;

        this.loadModels();
    }

    loadModels() {
        this.getRegisteredModels();
        this.loadUserDefinedModels();
        this.registerModelsWithSequelize();
    }

    getRegisteredModels() {
        this.registeredModels = require(this.pathVariable.getConfigPath('models'));
    }

    loadUserDefinedModels() {
        this.userDefinedModels = this.registeredModels.map(model => require(this.pathVariable.getModelPath(model)));
    }

    registerModelsWithSequelize() {
        this.userRegisteredModels = this.userDefinedModels.map(userDefinedModel => {

            let modelDefinition = {};

            for (const [column, description] of Object.entries(userDefinedModel.tableFields)) {

                description.type = description.type.split('.').reduce((accumulator, prop) => {
                    return accumulator[prop];
                }, this.sequelize);

                modelDefinition[column] = description;
            }

            let modelConfig = { sequelize: this.database, tableName: userDefinedModel.tableName, createdAt: 'created_at', updatedAt: 'updated_at' };

            userDefinedModel.init(modelDefinition, modelConfig);

            return userDefinedModel;
        });
    }
}

module.exports = new Proxy(Model, {
    construct(target, argArray) {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new target(...argArray);
        return this.instance;
    }
});