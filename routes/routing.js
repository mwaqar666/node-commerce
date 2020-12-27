const express = require('express');
const router = express.Router();
const utils = require(pathGenerator.utilsPath('utils'));

// Application & Admin Routes
const appRoutes = require('./app-routes').appRoutes;
const adminRoutes = require('./admin-routes').adminRoutes;

/*
 * =============================================================================
 * Now this method is responsible for recursively creating routes from the
 * original routes array that contain nested prefix groups. This is a recursive
 * method that looks for prefixed group routes deep inside the object and
 * respectively applies the prefix path & prefix names to created a single
 * dimensional route array
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

exports.routes = routes;
exports.router = router;