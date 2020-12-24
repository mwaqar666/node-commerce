const express = require('express');
const router = express.Router();
const controllerPath = require('../utils/path').controllerPath;

// Controllers
const HomeController = require(controllerPath('App/HomeController'));
const ShopController = require(controllerPath('App/ShopController'));
const CartController = require(controllerPath('App/CartController'));
const BlogController = require(controllerPath('App/BlogController'));
const AccountController = require(controllerPath('App/AccountController'));
const ProductController = require(controllerPath('App/ProductController'));
const AboutUsController = require(controllerPath('App/AboutUsController'));
const CompareController = require(controllerPath('App/CompareController'));
const WishlistController = require(controllerPath('App/WishlistController'));
const CheckoutController = require(controllerPath('App/CheckoutController'));
const ContactUsController = require(controllerPath('App/ContactUsController'));
const LoginRegisterController = require(controllerPath('App/LoginRegisterController'));

// Application Routes...
const urls = [
    //Home
    { path: '/home-1', method: 'get', name: 'home-1', action: HomeController.indexOne },
    { path: '/home-2', method: 'get', name: 'home-2', action: HomeController.indexTwo },

    // Shop
    { path: '/shop-1', method: 'get', name: 'shop-1', action: ShopController.shopOne },
    { path: '/shop-2', method: 'get', name: 'shop-2', action: ShopController.shopTwo },
    { path: '/shop-3', method: 'get', name: 'shop-3', action: ShopController.shopThree },
    { path: '/shop-4', method: 'get', name: 'shop-4', action: ShopController.shopFour },

    // Product Display
    { path: '/product-1', method: 'get', name: 'product-1', action: ProductController.productOne },
    { path: '/product-2', method: 'get', name: 'product-2', action: ProductController.productTwo },
    { path: '/product-3', method: 'get', name: 'product-3', action: ProductController.productThree },

    // Blog List
    { path: '/blog-1', method: 'get', name: 'blog-1', action: BlogController.blogOne },
    { path: '/blog-2', method: 'get', name: 'blog-2', action: BlogController.blogTwo },
    { path: '/blog-3', method: 'get', name: 'blog-3', action: BlogController.blogThree },
    { path: '/blog-4', method: 'get', name: 'blog-4', action: BlogController.blogFour },
    { path: '/blog-5', method: 'get', name: 'blog-5', action: BlogController.blogFive },
    { path: '/blog-6', method: 'get', name: 'blog-6', action: BlogController.blogSix },

    // Blog Single
    { path: '/blog-7', method: 'get', name: 'blog-7', action: BlogController.blogSeven },
    { path: '/blog-8', method: 'get', name: 'blog-8', action: BlogController.blogEight },
    { path: '/blog-9', method: 'get', name: 'blog-9', action: BlogController.blogNine },

    // Cart & Wishlist
    { path: '/cart', method: 'get', name: 'cart', action: CartController.showCart },
    { path: '/wishlist', method: 'get', name: 'wishlist', action: WishlistController.showWishlist },

    // Checkout
    { path: '/checkout', method: 'get', name: 'checkout', action: CheckoutController.showCheckout },

    // Login & Register
    { path: '/login-register', method: 'get', name: 'login-register', action: LoginRegisterController.showLoginRegister },

    // Account
    { path: '/account', method: 'get', name: 'account', action: AccountController.showAccount },

    // Compare
    { path: '/compare', method: 'get', name: 'compare', action: CompareController.showCompare },

    // About Us
    { path: '/about-us', method: 'get', name: 'about-us', action: AboutUsController.showAbout },

    // Contact Us
    { path: '/contact-us', method: 'get', name: 'contact-us', action: ContactUsController.showContactUs },
];

urls.forEach(url => {
    router[url.method](url.path, url.action);
});

exports.urls = urls;
exports.router = router;
