class RouterUtilities {

    constructor(routes) {
        this.routes = [...routes];
    }

    /**
     * 1) Apply parameters and query string to generate dynamic routes.
     * If user provides a dynamic URL portion of route which is not present
     * on the URL, then an error is thrown. Similarly, if user didn't provide
     * a required dynamic portion of a URL, then an error will also be thrown.
     */
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

    /**
     * 2) Get query parameters as key value pair from a URL. If no query param
     * is present on the URL, return an empty object
     */
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

    /**
     * 3) Get route object from parsed routes array by matching the URL. If not
     * found, return false
     */
    getRouteByURL(URL) {
        const segmentedURL = URL.split('/').filter(urlSegment => !!urlSegment);
        const segmentedRoutesArray = this.routes.map(registeredRoute => registeredRoute.path.split('/').filter(pathSegment => !!pathSegment));

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
                    return this.routes[index];
                }
            }
        }

        return false;
    }

    /**
     * 4) Method to get specific route from route name. If no route is found then
     * an error will be thrown
     */
    getRouteByName(name, routeParams = {}, queryParams = {}) {
        let requiredRoute = { ...this.routes.find(inspectedRoute => inspectedRoute.name === name) };
        if (Object.keys(requiredRoute).length) {
            requiredRoute.path = this.applyParameters(requiredRoute.path, routeParams, queryParams);
            return requiredRoute;
        }

        throw new Error(`Route with name '${name}' is not found`);
    }
}

module.exports = new Proxy(RouterUtilities, {
    construct(target, argArray) {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new target(...argArray);
        return this.instance;
    }
});