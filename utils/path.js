const path = require('path');

module.exports = {
    splitPath(path) {
        return path.split('/').filter(pathSegment => !!pathSegment);
    },
    constructPath(targetPath) {
        return path.join(
            path.dirname(require.main.filename), targetPath
        )
    },


    viewsPath(viewFilePath) {
        return this.constructPath(
            path.join('views', this.splitPath(viewFilePath))
        );
    },
    publicPath(publicFilePath) {
        return this.constructPath(
            path.join('public', this.splitPath(publicFilePath))
        );
    },
    modelPath(modelFilePath) {
        return this.constructPath(
            path.join('Models', this.splitPath(modelFilePath))
        );
    },
    routePath(routeFilePath) {
        return this.constructPath(
            path.join('routes', this.splitPath(routeFilePath))
        );
    },
    utilsPath(utilsFilePath) {
        return this.constructPath(
            path.join('utils', this.splitPath(utilsFilePath))
        );
    },
    corePath(coreFilePath) {
        return this.constructPath(
            path.join('Core', this.splitPath(coreFilePath))
        );
    },
    controllerPath(controllerFilePath) {
        return this.constructPath(
            path.join('Controllers', this.splitPath(controllerFilePath))
        );
    },
};