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
        this.dependencies = {
            core: {
                fs: require('fs'),
                path: require('path'),
            },
            thirdParty: {
                express: require('express'),
                nunjucks: require('nunjucks'),
                sequelize: require('sequelize'),
                bodyParser: require('body-parser'),
            }
        };
    }

    loadApplication() {
        this
            .startExpressProcess()
            .configurePath()
            .loadUtilities()
            .configureViewEngine()
            .loadDatabase()
            .loadModels()
            // .loadRouter();
    }

    startExpressProcess() {
        this.expressApp = this.dependencies.thirdParty.express();
        return this;
    }

    configurePath() {
        this.dependencies.pathVariable = new Path(this.dependencies.core.path);

        global.pathInstance = this.dependencies.pathVariable;

        return this;
    }

    loadUtilities() {
        this.dependencies.utils = {
            expressUtils: new ExpressUtilities(),
            generalUtils: new GeneralUtilities(),
            coreDependentUtils: new CoreDependentUtilities(
                this.dependencies.core.fs, this.dependencies.core.path
            ),
        };

        global.utilities = this.dependencies.utils;

        return this;
    }

    configureViewEngine() {
        this.dependencies.thirdParty.nunjucks.configure('views', { autoescape: true, express: this.expressApp });
        this.expressApp.use(this.dependencies.thirdParty.bodyParser.urlencoded({ extended: true }));
        this.expressApp.set('view engine', 'njk');
        this.expressApp.use('/static', this.dependencies.thirdParty.express.static(this.dependencies.pathVariable.getPublicPath()));

        return this;
    }

    loadDatabase() {
        const database = new Database(
            this.dependencies.thirdParty.sequelize, this.dependencies.pathVariable
        );

        this.dependencies.database = database.getDatabaseInstance();

        global.dbInstance = this.dependencies.database;
        global.BaseModel = this.dependencies.thirdParty.sequelize.Model;
        global.DT = this.dependencies.thirdParty.sequelize.DataTypes;

        return this;
    }

    loadModels() {
        const models = new Model(
            this.dependencies.thirdParty.sequelize, this.dependencies.database,
            this.dependencies.utils.coreDependentUtils, this.dependencies.pathVariable
        );
    }

    // This function is still faulty due to Controller Dependencies
    loadRouter() {

        const routerInstance = new Router(
            this.dependencies.core.fs, this.dependencies.pathVariable,
            this.dependencies.thirdParty.express, this.dependencies.utils.generalUtils,
            this.dependencies.utils.coreDependentUtils,
        );

        this.dependencies.router = {
            parsedRoutes: routerInstance.getParsedRoutes(),
            configuredExpressRouter: routerInstance.getExpressRouter(),
        };

        this.dependencies.utils.routerUtils = new RouterUtilities(this.dependencies.router.parsedRoutes);

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