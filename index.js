const helmet = require('helmet');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

// Routes, Utilities & Paths
const path = require('./utils/path');
const appRoutes = require(path.routePath('app-routes')).router;
const adminRoutes = require(path.routePath('admin-routes')).router;
const routeHelper = require('./utils/routes.js');

// Initiate Application
const app = express();
app.use(helmet());

// Initiate & Configure Nunjucks
// const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));
// env.addGlobal('route', routeHelper);
nunjucks.configure('views', { autoescape: true, express: app });
app.use((request, response, next) => {
    response.locals.route = routeHelper; next();
});

// Initiate Body Parser, View Engine, Static Middleware etc.
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'njk');
app.use(express.static(path.publicPath()));

// Use Routes
app.use('/admin', adminRoutes);
app.use(appRoutes);

// Start Server at Port: 3000
app.listen(2500);