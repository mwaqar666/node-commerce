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
        // this.userDefinedModels = Object.create(null);
        //
        // for (const model of Object.values(this.baseModel.registeredModels)) {
        //     let loadedModel = require(
        //         this.pathVariable.getModelPath(model)
        //     );
        //
        //     console.log(loadedModel.name);
        //
        //     Object.defineProperty(this.userDefinedModels, loadedModel.name, {
        //         value: new loadedModel(),
        //         writable: true, enumerable: true,
        //     });
        // }

        this.userDefinedModels = this.baseModel.registeredModels.map(model => {
            let loadedModel = require(
                this.pathVariable.getModelPath(model)
            )

            return new loadedModel();
        });

        console.log(this.userDefinedModels);
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