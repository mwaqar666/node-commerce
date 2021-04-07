'use strict';

const Path = require('./Path');
const ExpressUtilities = require('./Utilities/ExpressUtilities');
const GeneralUtilities = require('./Utilities/GeneralUtilities');
const CoreDependentUtilities = require('./Utilities/CoreDependentUtilities');
const RouterUtilities = require('./Utilities/RouterUtilities');
const Database = require('./Database');
const Model = require('./Model');
const Router = require('./Router');

// noinspection JSUnresolvedVariable,JSUnresolvedFunction
class Application {

    constructor() {
        this.dependencies = {};
    }

    loadApplication() {
        this
            .loadCorePackages()
            .loadThirdPartyPackages()
            .loadPathConstructor()
            .loadUtilities()
            .loadDatabase()
            .loadModels()
            /*.loadControllers()*/
            /*.loadRouter()*/;
    }

    loadCorePackages() {
        Object.defineProperty(this.dependencies, 'core', {
            value: {
                fs: require('fs'),
                path: require('path'),
            },
        });

        return this;
    }

    loadThirdPartyPackages() {
        Object.defineProperty(this.dependencies, 'thirdParty', {
            value: {
                express: require('express'),
                nunjucks: require('nunjucks'),
                sequelize: require('sequelize'),
                bodyParser: require('body-parser'),
            },
        });

        global._Sequelize = this.dependencies.thirdParty.sequelize;

        return this;
    }

    loadPathConstructor() {
        Object.defineProperty(this.dependencies, 'pathVariable', {
            value: new Path(this.dependencies.core.path),
        });

        global.pathGenerator = this.dependencies.pathVariable;

        return this;
    }

    loadUtilities() {
        Object.defineProperty(this.dependencies, 'utils', {
            value: {
                expressUtils: new ExpressUtilities(),
                generalUtils: new GeneralUtilities(),
                coreDependentUtils: new CoreDependentUtilities(
                    this.dependencies.core.fs, this.dependencies.core.path
                ),
            },
        });

        return this;
    }

    loadDatabase() {
        const database = new Database(this.dependencies.thirdParty.sequelize);

        Object.defineProperty(this.dependencies, 'database', {
            value: database.getDatabaseInstance(),
        });

        return this;
    }

    loadModels() {
        global.BaseModel = this.dependencies.thirdParty.sequelize.Model;

        const baseModel = new Model (
            this.dependencies.thirdParty.sequelize, this.dependencies.database,
            this.dependencies.utils.coreDependentUtils, this.dependencies.pathVariable
        )

        Object.defineProperty(this.dependencies, 'model', {
            value: 1,
        });

        return this;
    }

    // This function is still faulty due to Controller Dependencies
    loadRouter() {
        const routerInstance = new Router(
            this.dependencies.core.fs, this.dependencies.pathVariable,
            this.dependencies.thirdParty.express, this.dependencies.utils.generalUtils,
            this.dependencies.utils.coreDependentUtils,
        );

        Object.defineProperty(this.dependencies, 'router', {
            value: {
                parsedRoutes: routerInstance.getParsedRoutes(),
                configuredExpressRouter: routerInstance.getExpressRouter(),
            },
        });

        Object.defineProperty(this.dependencies.utils, 'routerUtils', {
            value: new RouterUtilities(this.dependencies.router.parsedRoutes),
        });

        return this;
    }
}

module.exports = new Proxy(Application, {
    construct(target, argArray) {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new target(...argArray);
        return this.instance;
    }
});