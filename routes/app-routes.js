const express = require('express');
const router = express.Router();
const controllerPath = require('../utils/path').controllerPath;

// Controllers
const homeController = require(controllerPath('app/homeController'));
const shopController = require(controllerPath('app/shopController'));
const cartController = require(controllerPath('app/cartController'));
const blogController = require(controllerPath('app/blogController'));
const accountController = require(controllerPath('app/accountController'));
const productController = require(controllerPath('app/productController'));
const aboutUsController = require(controllerPath('app/aboutUsController'));
const compareController = require(controllerPath('app/compareController'));
const wishlistController = require(controllerPath('app/wishlistController'));
const checkoutController = require(controllerPath('app/checkoutController'));
const contactUsController = require(controllerPath('app/contactUsController'));
const loginRegisterController = require(controllerPath('app/loginRegisterController'));

// Application Routes...
const urls = [
    //Home
    { path: '/home-1', method: 'get', name: 'home-1', action: homeController.indexOne },
    { path: '/home-2', method: 'get', name: 'home-2', action: homeController.indexTwo },

    // Shop
    { path: '/shop-1', method: 'get', name: 'shop-1', action: shopController.shopOne },
    { path: '/shop-2', method: 'get', name: 'shop-2', action: shopController.shopTwo },
    { path: '/shop-3', method: 'get', name: 'shop-3', action: shopController.shopThree },
    { path: '/shop-4', method: 'get', name: 'shop-4', action: shopController.shopFour },

    // Product Display
    { path: '/product-1', method: 'get', name: 'product-1', action: productController.productOne },
    { path: '/product-2', method: 'get', name: 'product-2', action: productController.productTwo },
    { path: '/product-3', method: 'get', name: 'product-3', action: productController.productThree },

    // Blog List
    { path: '/blog-1', method: 'get', name: 'blog-1', action: blogController.blogOne },
    { path: '/blog-2', method: 'get', name: 'blog-2', action: blogController.blogTwo },
    { path: '/blog-3', method: 'get', name: 'blog-3', action: blogController.blogThree },
    { path: '/blog-4', method: 'get', name: 'blog-4', action: blogController.blogFour },
    { path: '/blog-5', method: 'get', name: 'blog-5', action: blogController.blogFive },
    { path: '/blog-6', method: 'get', name: 'blog-6', action: blogController.blogSix },

    // Blog Single
    { path: '/blog-7', method: 'get', name: 'blog-7', action: blogController.blogSeven },
    { path: '/blog-8', method: 'get', name: 'blog-8', action: blogController.blogEight },
    { path: '/blog-9', method: 'get', name: 'blog-9', action: blogController.blogNine },

    // Cart & Wishlist
    { path: '/cart', method: 'get', name: 'cart', action: cartController.showCart },
    { path: '/wishlist', method: 'get', name: 'wishlist', action: wishlistController.showWishlist },

    // Checkout
    { path: '/checkout', method: 'get', name: 'checkout', action: checkoutController.showCheckout },

    // Login & Register
    { path: '/login-register', method: 'get', name: 'login-register', action: loginRegisterController.showLoginRegister },

    // Account
    { path: '/account', method: 'get', name: 'account', action: accountController.showAccount },

    // Compare
    { path: '/compare', method: 'get', name: 'compare', action: compareController.showCompare },

    // About Us
    { path: '/about-us', method: 'get', name: 'about-us', action: aboutUsController.showAbout },

    // Contact Us
    { path: '/contact-us', method: 'get', name: 'contact-us', action: contactUsController.showContactUs },
];

urls.forEach(url => {
    router[url.method](url.path, url.action);
});

exports.urls = urls;
exports.router = router;
