const express = require('express');
const router = express.Router();
// const controllerPath = require('../utils/path').controllerPath;

// Controllers
// ...

// Admin Routes...
const urls = [

];

urls.forEach(url => {
    router[url.method](url.route, url.action);
});

exports.urls = urls;
exports.router = router;
