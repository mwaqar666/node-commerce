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
        this.dbModels = this.coreDependentUtils.readFilesFromDirectory(
            this.pathVariable.getModelPath(), true
        ).map(modelFile => require(modelFile));
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