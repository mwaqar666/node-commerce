const express = require('express');
const router = express.Router();
const controllerPath = require('../utils/path').controllerPath;

// Controllers
const homeController = require(controllerPath('app/homeController'));
const aboutUsController = require(controllerPath('app/aboutUsController'));
const shopController = require(controllerPath('app/shopController'));

// Application Routes...
const urls = [
    //Home
    { path: '/home-1', method: 'get', name: 'home-1', action: homeController.indexOne },
    { path: '/home-2', method: 'get', name: 'home-2', action: homeController.indexTwo },

    // About Us
    { path: '/about-us', method: 'get', name: 'about-us', action: aboutUsController.index },

    // Shop
    { path: '/shop-1', method: 'get', name: 'shop-1', action: shopController.shopOne },
    { path: '/shop-2', method: 'get', name: 'shop-2', action: shopController.shopTwo },
    { path: '/shop-3', method: 'get', name: 'shop-3', action: shopController.shopThree },
    { path: '/shop-4', method: 'get', name: 'shop-4', action: shopController.shopFour },
    { path: '/shop-5', method: 'get', name: 'shop-5', action: shopController.shopFive },
    { path: '/shop-6', method: 'get', name: 'shop-6', action: shopController.shopSix },
    { path: '/shop-7', method: 'get', name: 'shop-7', action: shopController.shopSeven },
];

urls.forEach(url => {
    router[url.method](url.path, url.action);
});

exports.urls = urls;
exports.router = router;
