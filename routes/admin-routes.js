module.exports = [
    {
        prefix: '/admin', as: 'admin', namespace: 'Admin', routes: [

            // Dashboard
            {path: '/', method: 'get', name: 'dashboard', action: 'DashboardController@index'},

            // Products
            {
                prefix: '/products', as: 'products', routes: [
                    {path: '/list', method: 'get', name: 'list', action: 'ProductController@list'},
                    {path: '/create', method: 'get', name: 'create', action: 'ProductController@create'},
                    {path: '/store', method: 'post', name: 'store', action: 'ProductController@store'},
                    {path: '/view/:product', method: 'get', name: 'view', action: 'ProductController@view'},
                    {path: '/edit/:product', method: 'get', name: 'edit', action: 'ProductController@edit'},
                    {path: '/update/:product', method: 'patch', name: 'update', action: 'ProductController@update'},
                    {path: '/delete/:product', method: 'delete', name: 'delete', action: 'ProductController@delete'},
                ],
            },

            // Tags
            {
                prefix: '/tags', as: 'tags', routes: [
                    {path: '/list', method: 'get', name: 'list', action: 'TagController@list'},
                    {path: '/create', method: 'get', name: 'create', action: 'TagController@create'},
                    {path: '/store', method: 'post', name: 'store', action: 'TagController@store'},
                    {path: '/view/:tag', method: 'get', name: 'view', action: 'TagController@view'},
                    {path: '/edit/:tag', method: 'get', name: 'edit', action: 'TagController@edit'},
                    {path: '/update/:tag', method: 'patch', name: 'update', action: 'TagController@update'},
                    {path: '/delete/:tag', method: 'delete', name: 'delete', action: 'TagController@delete'},
                ],
            },

            // Categories
            {
                prefix: '/categories', as: 'categories', routes: [
                    {path: '/list', method: 'get', name: 'list', action: 'CategoryController@list'},
                    {path: '/create', method: 'get', name: 'create', action: 'CategoryController@create'},
                    {path: '/store', method: 'post', name: 'store', action: 'CategoryController@store'},
                    {path: '/view/:category', method: 'get', name: 'view', action: 'CategoryController@view'},
                    {path: '/edit/:category', method: 'get', name: 'edit', action: 'CategoryController@edit'},
                    {path: '/update/:category', method: 'patch', name: 'update', action: 'CategoryController@update'},
                    {path: '/delete/:category', method: 'delete', name: 'delete', action: 'CategoryController@delete'},
                ],
            },

            // Currencies
            {
                prefix: '/currencies', as: 'currencies', routes: [
                    {path: '/list', method: 'get', name: 'list', action: 'CurrencyController@list'},
                    {path: '/create', method: 'get', name: 'create', action: 'CurrencyController@create'},
                    {path: '/store', method: 'post', name: 'store', action: 'CurrencyController@store'},
                    {path: '/view/:currency', method: 'get', name: 'view', action: 'CurrencyController@view'},
                    {path: '/edit/:currency', method: 'get', name: 'edit', action: 'CurrencyController@edit'},
                    {path: '/update/:currency', method: 'patch', name: 'update', action: 'CurrencyController@update'},
                    {path: '/delete/:currency', method: 'delete', name: 'delete', action: 'CurrencyController@delete'},
                ],
            },

            // Product Attributes
            {
                prefix: '/product-attributes', as: 'product-attributes', routes: [
                    {path: '/list', method: 'get', name: 'list', action: 'ProductAttributeController@list'},
                    {path: '/create', method: 'get', name: 'create', action: 'ProductAttributeController@create'},
                    {path: '/store', method: 'post', name: 'store', action: 'ProductAttributeController@store'},
                    {path: '/view/:productAttribute', method: 'get', name: 'view', action: 'ProductAttributeController@view'},
                    {path: '/edit/:productAttribute', method: 'get', name: 'edit', action: 'ProductAttributeController@edit'},
                    {path: '/update/:productAttribute', method: 'patch', name: 'update', action: 'ProductAttributeController@update'},
                    {path: '/delete/:productAttribute', method: 'delete', name: 'delete', action: 'ProductAttributeController@delete'},
                ],
            },
        ],
    },
];