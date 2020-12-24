const express = require('express');
const router = express.Router();
const controllerPath = require('../utils/path').controllerPath;

// Controllers
const TagController = require(controllerPath('Admin/TagController'));
const UserController = require(controllerPath('Admin/UserController'));
const CategoryController = require(controllerPath('Admin/CategoryController'));
const ProductController = require(controllerPath('Admin/ProductController'));

// Admin Routes...
const urls = [

];

urls.forEach(url => {
    router[url.method](url.route, url.action);
});

exports.urls = urls;
exports.router = router;
