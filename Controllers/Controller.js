class Controller {
    redirectRoute(name, routeParams = {}, queryParams = {}) {
        return utilities.routerUtils.getRouteByName(name, routeParams, queryParams);
    }
}

module.exports = Controller;
