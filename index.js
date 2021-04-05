const Application = require('./Core/Application');
const application = new Application();
application.initializeApplication();

/**
 * Old Code
 * ==========
 * Don't delete till yet until the proper execution of whole
 * framework ( under Development )
 */

// const helmet = require('helmet');
// const express = require('express');
// const nunjucks = require('nunjucks');
// const bodyParser = require('body-parser');
//
// // Custom Code Modules ( Router, Utilities etc... )
// global.pathGenerator = require('./utils/path');
//
// const generalUtils = require(pathGenerator.utilsPath('general-utils'));
// const expressUtils = require(pathGenerator.utilsPath('express-utils'));
// const routerUtils = require(pathGenerator.utilsPath('router-utils'));
// const router = require(pathGenerator.routePath('router'));               /* Framework Execution Done Till This Line ( Still Need To Handle Controllers & Models ) */
// const sequelize = require(pathGenerator.utilsPath('database'));
//
//
// // Initiate Application
// const app = express();
//
//
// // Initiate & Configure Modules ( Templating Engine, Body Parser, Static Middleware etc... )
// // app.use(helmet());
// nunjucks.configure('views', { autoescape: true, express: app });
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'njk');
// app.use('/static', express.static(pathGenerator.publicPath()));
//
// // Override The Request Method With Custom Method If Provided In "_method" Field
// app.use(expressUtils.overrideRequestMethodIfProvidedExplicitly());
//
// // Set Some Helper Methods & Variables To Be Used In Views
// app.use(
//     expressUtils.except('/static', (request, response, next) => {
//         response.locals.currentRoute = routerUtils.getRouteByURL(request.originalUrl);
//         response.locals.route = routerUtils.getRouteByName;
//         response.locals.getRoute = routerUtils.getRouteByURL;
//         response.locals.getQueryParams = routerUtils.getQueryParams;
//         response.locals.convertCase = generalUtils.convertCase;
//         response.locals._method = generalUtils._method;
//
//         next();
//     })
// );
//
// // Use Router
// app.use(router.createParsedRoutes().registerRoutes().getExpressRouter());
//
// // Synchronize Database & Run The Application
// sequelize.sync({ force: true })
//     .then((/*result*/) => {
//         // console.log('Success: ', result);
//
//         // Start Server at Port: 3000
//         app.listen(3000);
//     })
//     .catch(error => {
//         console.log(error);
//     });
