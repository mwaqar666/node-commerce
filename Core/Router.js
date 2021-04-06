// noinspection JSUnresolvedFunction
class Router {

    controllerInstances = {};

    constructor(fs, pathVariable, expressInstance, generalUtilities, coreDependentUtils) {
        this.fs = fs;
        this.pathVariable = pathVariable;
        this.expressRouter = expressInstance.Router();
        this.generalUtilities = generalUtilities;
        this.expressRouterIsConfigured = false;
        this.coreDependentUtils = coreDependentUtils;
        this.loadRoutes();
    }

    createParsedRoutes() {
        if (this.parsedRoutes) {
            return this;
        }

        this.parsedRoutes = this.rawRoutes.map(route => {
            if (!!route.prefix) {
                return this.parsePrefixedRoutes(
                    route.routes,
                    this.generalUtilities.trim(route.prefix, '/'),
                    this.generalUtilities.trim(route.as, '.'),
                    this.generalUtilities.trim(route.namespace, '/')
                );
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
                    [...prefixPathArray, this.generalUtilities.trim(prefixedRoute.prefix, '/')],
                    [...prefixNameArray, this.generalUtilities.trim(prefixedRoute.as, '.')],
                    [...prefixNamespaceArray, this.generalUtilities.trim(prefixedRoute.namespace, '/')]
                );
            }

            let prefixPath = prefixPathArray.join('/');

            return {
                path: `/${prefixPath ? `${prefixPath}/` : ``}${this.generalUtilities.trim(prefixedRoute.path, '/')}`,
                method: prefixedRoute.method,
                name: `${prefixNameArray.join('.')}.${this.generalUtilities.trim(prefixedRoute.name, '.')}`,
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
            this.pathVariable.getControllerPath(`${!!namespace ? `${namespace}/` : ``}${controller}`)
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

    loadRoutes() {
        this.rawRoutes = this.coreDependentUtils.readFilesFromDirectory(
            this.pathVariable.getRoutePath()
        ).map(routeFile => require(routeFile)).flat(Infinity);
    }

    registerRoutes() {
        if (this.expressRouterIsConfigured) {
            return this;
        }

        this.parsedRoutes.forEach(route => {
            this.expressRouter[route.method](route.path, route.action);
        });

        this.expressRouterIsConfigured = ! this.expressRouterIsConfigured;

        return this;
    }

    getExpressRouter() {
        if (! this.expressRouterIsConfigured) {
            this.registerRoutes();
        }

        return this.expressRouter;
    }

    getParsedRoutes() {
        if (! this.parsedRoutes) {
            this.createParsedRoutes();
        }

        return this.parsedRoutes;
    }
}

module.exports = new Proxy(Router, {
    construct(target, argArray) {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new target(...argArray);
        return this.instance;
    }
});