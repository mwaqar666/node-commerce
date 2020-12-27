const helmet = require('helmet');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

// Routes, Utilities & Paths
global.pathGenerator = require('./utils/path');
const router = require(pathGenerator.routePath('routing')).router;
const sequelize = require(pathGenerator.utilsPath('database'));
const routeHelper = require(pathGenerator.utilsPath('routes.js')).route;

// Initiate Application
const app = express();
// app.use(helmet());

// Initiate & Configure Nunjucks
nunjucks.configure('views', { autoescape: true, express: app });
app.use((request, response, next) => {
    response.locals.route = routeHelper; next();
});

// Initiate Body Parser, View Engine, Static Middleware etc.
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'njk');
app.use(express.static('public'));

// Use Router
app.use(router);

// Synchronize Database
sequelize.sync({ force: true })
    .then(result => {
        // console.log('Success: ', result);

        // Start Server at Port: 3000
        app.listen(3000);
    })
    .catch(error => {
        console.log(error);
    });