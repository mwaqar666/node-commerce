const helmet = require('helmet');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

// Custom Code Modules ( Router, Utilities etc... )
global.pathGenerator = require('./utils/path');
const utils = require(pathGenerator.utilsPath('utils'));
const router = require(pathGenerator.routePath('router'));
const sequelize = require(pathGenerator.utilsPath('database'));


// Initiate Application
const app = express();


// Initiate & Configure Modules ( Templating Engine, Body Parser, Static Middleware etc... )
// app.use(helmet());
nunjucks.configure('views', { autoescape: true, express: app });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'njk');
app.use('/static', express.static(pathGenerator.publicPath()));


// Set Some Helper Methods & Variables To Be Used In Views
app.use(utils.except('/static', (request, response, next) => {
    response.locals.currentRoute = router.getRouteByURL(request.originalUrl);
    response.locals.route = router.getRouteByName;
    response.locals.getRoute = router.getRouteByURL;
    response.locals.getQueryParams = router.getQueryParams;
    response.locals.convertCase = utils.convertCase;

    next();
}));

// Initialize Router
app.use(router.router);

// Synchronize Database & Run The Application
sequelize.sync(/*{ force: true }*/)
    .then((/*result*/) => {
        // console.log('Success: ', result);

        // Start Server at Port: 3000
        app.listen(3000);
    })
    .catch(error => {
        console.log(error);
    });