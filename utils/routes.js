const routes = require(pathGenerator.routePath('routing')).routes;

/*
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

/*
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

/*
 * ===================================================
 * Method to get specific route from route name.
 * If no route is found then an error will be thrown
 * ===================================================
 */
exports.route = (name, routeParams = {}, queryParams = {}) => {
    let requiredRoute = { ...routes.find(inspectedRoute => inspectedRoute.name === name) };
    if (Object.keys(requiredRoute).length) {
        requiredRoute.path = applyParameters(requiredRoute.path, routeParams, queryParams);
        return requiredRoute;
    }

    throw new Error(`Route with name '${name}' is not found`);
};