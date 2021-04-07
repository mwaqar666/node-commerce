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
        this.loadBaseModel();
        this.loadUserDefinedModels();
    }

    loadBaseModel() {
        this.baseModel = require(this.pathVariable.getModelPath('Model'));
    }

    loadUserDefinedModels() {
        this.userDefinedModels = this.baseModel.models.map(model => {
            model = require(
                this.pathVariable.getModelPath(model)
            )

            return model;
        })
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