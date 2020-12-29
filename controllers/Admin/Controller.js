exports.redirectRoute = (name, routeParams = {}, queryParams = {}) => {
    return require(pathGenerator.routePath('router')).getRouteByName(name, routeParams, queryParams);
};