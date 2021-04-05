'use strict';

const Path = require('./Path');
const ExpressUtilities = require('./Utilities/Express-Utilities');
const GeneralUtilities = require('./Utilities/General-Utilities');
const RouterUtilities = require('./Utilities/Router-Utilities');
const Router = require('./Router');

// noinspection JSUnresolvedVariable,JSUnresolvedFunction
class Application {

    constructor() {
        this.dependencies = {};
    }

    initializeApplication() {
        this
            .initiateCore()
            .initiateThirdPartyPackages()
            .initiatePathVariable()
            .initiateUtilities()
            .initiateRouter()
            .initiateRouterUtilities();
    }

    initiateCore() {
        Object.defineProperty(this.dependencies, 'core', {
            value: {
                fs: require('fs'),
                path: require('path'),
            },
        });

        return this;
    }

    initiateThirdPartyPackages() {
        Object.defineProperty(this.dependencies, 'thirdParty', {
            value: {
                express: require('express'),
                nunjucks: require('nunjucks'),
                bodyParser: require('body-parser'),
            },
        });

        return this;
    }

    initiatePathVariable() {
        Object.defineProperty(this.dependencies, 'pathVariable', {
            value: new Path(this.dependencies.core.path),
        });

        global.pathGenerator = this.dependencies.pathVariable;

        return this;
    }

    initiateUtilities() {
        Object.defineProperty(this.dependencies, 'utils', {
            value: {
                expressUtils: new ExpressUtilities(),
                generalUtils: new GeneralUtilities(),
            },
        });

        return this;
    }

    initiateRouter() {
        const routerInstance = new Router(
            this.dependencies.core.fs, this.dependencies.pathVariable,
            this.dependencies.thirdParty.express, this.dependencies.utils.generalUtils
        );

        Object.defineProperty(this.dependencies, 'router', {
            value: {
                parsedRoutes: routerInstance.getParsedRoutes(),
                configuredExpressRouter: routerInstance.getExpressRouter(),
            },
        });

        return this;
    }

    initiateRouterUtilities() {
        Object.defineProperty(this.dependencies.utils, 'routerUtils', {
            value: new RouterUtilities(this.dependencies.router.parsedRoutes),
        });
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