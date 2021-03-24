const path = require('path');
const utils = require('./utils');

const constructPath = directoryPath => {
    directoryPath = utils.trim(directoryPath, '/', true);
    return path.join(path.dirname(require.main.filename), directoryPath);
};

const viewsPath = (view = '') => constructPath(path.join('views', view));
const publicPath = (file = '') => constructPath(path.join('public', file));
const modelPath = (model = '') => constructPath(path.join('Models', model));
const routePath = (route = '') => constructPath(path.join('routes', route));
const utilsPath = (util = '') => constructPath(path.join('utils', util));
const controllerPath = (controller = '') => constructPath(path.join('Controllers', controller));

exports.viewsPath = viewsPath;
exports.modelPath = modelPath;
exports.routePath = routePath;
exports.publicPath = publicPath;
exports.utilsPath = utilsPath;
exports.controllerPath = controllerPath;
