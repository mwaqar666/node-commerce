const utils = require(pathGenerator.routePath('router'));

class Controller {
    redirectRoute(name, routeParams = {}, queryParams = {}) {
        return utils.getRouteByName(name, routeParams, queryParams);
    }
}

module.exports = Controller;
