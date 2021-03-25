const express = require('express');
const expressRouter = express.Router();
const utils = require(pathGenerator.utilsPath('utils'));

// Application & Admin Routes
const appRoutes = require('./app-routes');
const adminRoutes = require('./admin-routes');

class Router {

    rawRoutes = [];
    parsedRoutes = [];
    controllerInstances = {};

    constructor(rawRoutes) {
        this.rawRoutes = rawRoutes;
        this.createParsedRoutes();
    }

    createParsedRoutes() {
        this.rawRoutes = this.rawRoutes.map(route => {
            if (!!route.prefix) {
                return this.parsePrefixedRoutes(route.routes, utils.trim(route.prefix, '/'), utils.trim(route.as, '.'), utils.trim(route.namespace, '/'));
            }

            route.action = this.routeToControllerMethod(route.action);
            return route;
        });
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

        controllerInstance = require(controllerPath);
        this.controllerInstances[controllerPath] = controllerInstance;
        return controllerInstance;
    }

    getParsedRoutes() {

        console.log(this.controllerInstances);
        console.log(this.parsedRoutes.flat(Infinity));

        return this.parsedRoutes.flat(Infinity);
    }

    applyParameters(path, routeParams, queryParams) {

        // Apply URL Required Parameters
        if (Object.keys(routeParams).length !== 0) {
            for (const [param, value] of Object.entries(routeParams)) {
                if (path.search(`:${param}`) === -1) {
                    throw new Error(`Route parameter '${param}' not found in route "${path}"`);
                }
                path = path.replace(`:${param}`, value);
            }
        }

        // Check If Required Route Parameter Remains Unfilled
        const notMatchedParameter = path.substring(
            path.indexOf(':') + 1, path.indexOf('/', path.indexOf(':')) === -1 ? path.length : path.indexOf('/', path.indexOf(':'))
        );

        if (notMatchedParameter) {
            throw new Error(`Route parameter ':${notMatchedParameter}' is undefined`);
        }

        // Apply URL Query Parameters
        const queryParamsFirstIndexParam = Object.keys(queryParams)[0];
        for (const [param, value] of Object.entries(queryParams)) {
            path += `${param === queryParamsFirstIndexParam ? '?' : '&'}${param}=${value}`;
        }

        return path;
    }

    getQueryParams(URL) {
        const queryParams = {};
        const queries = URL.split('?')[1];
        if (queries) {
            queries.split('&').forEach(queryParam => {
                queryParam = queryParam.split('=');
                queryParams[queryParam[0]] = queryParam[1];
            });
        }

        return queryParams;
    }

    getRouteByURL(URL) {
        const segmentedURL = URL.split('/').filter(urlSegment => !!urlSegment);
        const segmentedRoutesArray = routes.map(registeredRoute => registeredRoute.path.split('/').filter(pathSegment => !!pathSegment));

        for (const [index, segmentedRoute] of Object.entries(segmentedRoutesArray)) {
            if (segmentedRoute.length === segmentedURL.length) {

                let matchedSegments = 0;
                for (let segmentIndex = 0; segmentIndex < segmentedRoute.length; segmentIndex++) {
                    if (
                        segmentedRoute[segmentIndex].startsWith(':')
                        ||
                        segmentedRoute[segmentIndex] === segmentedURL[segmentIndex]
                    ) {
                        matchedSegments++;
                    }
                }

                if (matchedSegments === segmentedRoute.length) {
                    return routes[index];
                }
            }
        }

        return false;
    }

    getRouteByName(name, routeParams = {}, queryParams = {}) {
        let requiredRoute = { ...routes.find(inspectedRoute => inspectedRoute.name === name) };
        if (Object.keys(requiredRoute).length) {
            requiredRoute.path = applyParameters(requiredRoute.path, routeParams, queryParams);
            return requiredRoute;
        }

        throw new Error(`Route with name '${name}' is not found`);
    }
}

const router = new Router([...appRoutes, ...adminRoutes]);
const routes = router.getParsedRoutes();

// Register routes in Express
routes.forEach(route => {
    expressRouter[route.method](route.path, route.action);
});

// Module Exports
exports.routes = routes;
exports.router = expressRouter;
exports.getRouteByURL = getRouteByURL;
exports.getRouteByName = getRouteByName;
exports.getQueryParams = getQueryParams;
