const express = require('express');
const router = express.Router();
const utils = require(pathGenerator.utilsPath('utils'));

// Application & Admin Routes
const appRoutes = require('./app-routes').appRoutes;
const adminRoutes = require('./admin-routes').adminRoutes;


// ================================================================================================
// ====================================== Functions ===============================================
// ================================================================================================


/* 1)
 * =============================================================================
 * This method is responsible for recursively creating routes from the original
 * routes array that contain nested prefix groups. This is a recursive method
 * that looks for prefixed group routes deep inside the object and respectively
 * applies the prefix path & prefix names to created a single dimensional route
 * array
 * =============================================================================
 */
const parsePrefixedRoutes = (prefixedRoutesArray, prefixPathArray, prefixNameArray) => {
    prefixPathArray = !Array.isArray(prefixPathArray) ? [prefixPathArray] : [...prefixPathArray];
    prefixNameArray = !Array.isArray(prefixNameArray) ? [prefixNameArray] : [...prefixNameArray];

    return prefixedRoutesArray.map(prefixedRoute => {
        if (!!prefixedRoute.prefix) {
            return parsePrefixedRoutes(
                prefixedRoute.routes, [...prefixPathArray, utils.trim(prefixedRoute.prefix, '/')], [...prefixNameArray, utils.trim(prefixedRoute.as, '.')]
            );
        }

        let prefixPath = prefixPathArray.join('/');

        return {
            path: `/${prefixPath ? `${prefixPath}/` : ``}${utils.trim(prefixedRoute.path, '/')}`,
            method: prefixedRoute.method,
            name: `${prefixNameArray.join('.')}.${utils.trim(prefixedRoute.name, '.')}`,
            action: prefixedRoute.action
        };
    });
};

/* 2)
 * =========================================================================
 * Apply parameters and query string to generate dynamic routes.
 * If user provides a dynamic URL portion of route which is not present
 * on the URL, then an error is thrown. Similarly, if user didn't provide
 * a required dynamic portion of a URL, then an error will also be thrown.
 * =========================================================================
 */
const applyParameters = (path, routeParams, queryParams) => {

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
};

/* 3)
 * ====================================================
 * Get query parameters as key value pair from a URL.
 * If no query param is present on the URL, return an
 * empty object
 * ====================================================
 */
const getQueryParams = URL => {
    const queryParams = {};
    const queries = URL.split('?')[1];
    if (queries) {
        queries.split('&').forEach(queryParam => {
            queryParam = queryParam.split('=');
            queryParams[queryParam[0]] = queryParam[1];
        });
    }

    return queryParams;
};

/* 4)
 * ===================================================
 * Method to get specific route from route name.
 * If no route is found then an error will be thrown
 * ===================================================
 */
const route = (name, routeParams = {}, queryParams = {}) => {
    let requiredRoute = { ...routes.find(inspectedRoute => inspectedRoute.name === name) };
    if (Object.keys(requiredRoute).length) {
        requiredRoute.path = applyParameters(requiredRoute.path, routeParams, queryParams);
        return requiredRoute;
    }

    throw new Error(`Route with name '${name}' is not found`);
};

/* 5)
 * =====================================================
 * Gets the current route as segmented array with '/'
 * being the delimiter. If segment parameter is present
 * then returns that specific segment, else returns the
 * whole segmented array
 * =====================================================
 */
const routeSegment = (route, segment = null) => {
    return utils.stringSegment(route, '/', segment);
};


// ================================================================================================
// ====================================== Functions ===============================================
// ================================================================================================



const routes = [...appRoutes, ...adminRoutes].map(route => {
    if (!!route.prefix) {
        return parsePrefixedRoutes(route.routes, utils.trim(route.prefix, '/'), utils.trim(route.as, '.'));
    }

    return route;
}).flat(Infinity);

// Register routes in Express
routes.forEach(route => {
    router[route.method](route.path, route.action);
});


// Module Exports
exports.route = route;
exports.routes = routes;
exports.router = router;
exports.routeSegment = routeSegment;
exports.getQueryParams = getQueryParams;