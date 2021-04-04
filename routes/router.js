const express = require('express');
const expressRouter = express.Router();
const utils = require(pathGenerator.utilsPath('general-utils'));

// Application & Admin Routes
const appRoutes = require('./app-routes');
const adminRoutes = require('./admin-routes');

class Router {

    rawRoutes = [...appRoutes, ...adminRoutes];
    parsedRoutes = [];
    expressRouter = expressRouter;
    controllerInstances = {};

    createParsedRoutes() {
        this.parsedRoutes = this.rawRoutes.map(route => {
            if (!!route.prefix) {
                return this.parsePrefixedRoutes(route.routes, utils.trim(route.prefix, '/'), utils.trim(route.as, '.'), utils.trim(route.namespace, '/'));
            }

            route.action = this.routeToControllerMethod(route.action);
            return route;
        }).flat(Infinity);

        return this;
    }

    parsePrefixedRoutes(prefixedRoutesArray, prefixPathArray, prefixNameArray, prefixNamespaceArray) {

        prefixPathArray = !Array.isArray(prefixPathArray) ? [prefixPathArray] : [...prefixPathArray];
        prefixNameArray = !Array.isArray(prefixNameArray) ? [prefixNameArray] : [...prefixNameArray];
        prefixNamespaceArray = !Array.isArray(prefixNamespaceArray) ? [prefixNamespaceArray] : [...prefixNamespaceArray];

        return prefixedRoutesArray.map(prefixedRoute => {
            if (!!prefixedRoute.prefix) {
                return this.parsePrefixedRoutes(
                    prefixedRoute.routes,
                    [...prefixPathArray, utils.trim(prefixedRoute.prefix, '/')],
                    [...prefixNameArray, utils.trim(prefixedRoute.as, '.')],
                    [...prefixNamespaceArray, utils.trim(prefixedRoute.namespace, '/')]
                );
            }

            let prefixPath = prefixPathArray.join('/');

            return {
                path: `/${prefixPath ? `${prefixPath}/` : ``}${utils.trim(prefixedRoute.path, '/')}`,
                method: prefixedRoute.method,
                name: `${prefixNameArray.join('.')}.${utils.trim(prefixedRoute.name, '.')}`,
                action: this.routeToControllerMethod(prefixedRoute.action, prefixNamespaceArray),
            };
        });
    }

    routeToControllerMethod(routeAction, namespace = '') {
        const [controller, method] = routeAction.split('@');

        if (Array.isArray(namespace)) {
            namespace = namespace.join('/');
        }

        const controllerInstance = this.getControllerInstance(
            pathGenerator.controllerPath(`${!!namespace ? `${namespace}/` : ``}${controller}`)
        )

        return controllerInstance[method];
    }

    getControllerInstance(controllerPath) {
        let controllerInstance = this.controllerInstances[controllerPath];

        if (!!controllerInstance) {
            return controllerInstance;
        }

        const controller = require(controllerPath);
        controllerInstance = new controller();
        this.controllerInstances[controllerPath] = controllerInstance;
        return controllerInstance;
    }

    registerRoutes() {
        this.parsedRoutes.forEach(route => {
            this.expressRouter[route.method](route.path, route.action);
        });

        return this;
    }

    getExpressRouter() {
        return this.expressRouter;
    }

    getParsedRoutes() {
        return this.parsedRoutes;
    }
}

module.exports = new Router();