const routePath = require('./path').routePath;
const appUrls = require(routePath('app-routes')).urls;
const adminUrls = require(routePath('admin-routes')).urls;
const allRoutes = [ ...appUrls, ...adminUrls ];

module.exports = route = (name) => {
    const matchedRoute = { ...allRoutes.find(inspectedRoute => inspectedRoute.name === name) };
    return matchedRoute;
};