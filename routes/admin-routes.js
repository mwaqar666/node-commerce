const controllerPath = require('../utils/path').controllerPath;

// Controllers
const DashboardController = require(controllerPath('Admin/DashboardController'));
const TagController = require(controllerPath('Admin/TagController'));
const UserController = require(controllerPath('Admin/UserController'));
const CategoryController = require(controllerPath('Admin/CategoryController'));
const ProductController = require(controllerPath('Admin/ProductController'));

/**
 * Some Rules For Routing:
 * -----------------------
 *
 * 1. Simple route object has four properties: path, method, name, action
 * 2.
 */

// Admin Routes...
const adminRoutes = [

    {
        prefix: '/admin', as: 'admin', routes: [

            // Dashboard
            { path: '/', method: 'get', name: 'dasboard', action: DashboardController.index },

            // Products
            {
                prefix: '/products', as: 'products', routes: [
                    { path: '/list', method: 'get', name: 'list', action: ProductController.list },
                    { path: '/create', method: 'get', name: 'create', action: ProductController.create },
                    { path: '/store', method: 'post', name: 'store', action: ProductController.store },
                    { path: '/view', method: 'get', name: 'view', action: ProductController.view },
                    { path: '/edit', method: 'get', name: 'edit', action: ProductController.edit },
                    { path: '/update', method: 'patch', name: 'edit', action: ProductController.update },
                    { path: '/delete', method: 'delete', name: 'delete', action: ProductController.delete },
                ]
            },
        ]
    },
];

exports.adminRoutes = adminRoutes;
