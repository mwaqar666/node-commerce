const {Op} = require('sequelize');
const modelPath = pathGenerator.modelPath;
const {redirectRoute} = require(pathGenerator.controllerPath('Controller'));
const Product = require(modelPath('Product'));
const createSlug = require(pathGenerator.utilsPath('utils')).createSlug;

const parentPageTitle = 'Product';
const viewsDirectory = 'admin/product';

exports.list = (request, response) => {
    const title = 'List';
    const dataColumns = ['id', 'name', 'regularPrice', 'discountPrice', 'quantity', 'image', 'featured', 'sale', 'status'];

    Product.findAll({
        attributes: dataColumns,
    })
        .then(products => {
            return response.render(`${viewsDirectory}/list`, {dataColumns, products, title, parentPageTitle});
        })
        .catch(error => {
            console.log(error);
        });
};

exports.create = (request, response) => {
    const title = 'Create';
    return response.render(`${viewsDirectory}/create`, {title, parentPageTitle});
};

exports.store = (request, response) => {
    const product = request.body;
    delete product.files;
    product.slug = createSlug(product.name);

    Product.create(product)
        .then(() => {
            return response.redirect(
                redirectRoute('admin.products.list').path
            );
        })
        .catch(error => {
            console.log(error);
        });
};

exports.view = (request, response) => {
    const title = 'View';

    Product.findOne({
        where: {
            id: {
                [Op.eq]: request.params.product,
            },
        },
    })
        .then(product => {
            return response.render(`${viewsDirectory}/view`, {product, title, parentPageTitle});
        })
        .catch(error => {
            console.log(error);
        });
};

exports.edit = (request, response) => {
    const title = 'Edit';

    Product.findOne({
        where: {
            id: {
                [Op.eq]: request.params.product,
            },
        },
    })
        .then(product => {
            return response.render(`${viewsDirectory}/edit`, {product, title, parentPageTitle});
        })
        .catch(error => {
            console.log(error);
        });
};

exports.update = (request, response) => {
    const updatedProduct = request.body;
    delete updatedProduct._method;
    delete updatedProduct.files;

    Product.update(updatedProduct, {
        where: {
            id: {
                [Op.eq]: request.params.product,
            },
        },
    })
        .then(() => {
            return response.redirect(
                redirectRoute('admin.products.list').path
            );
        })
        .catch(error => {
            console.log(error);
        });
};

exports.delete = (request, response) => {
    Product.destroy({
        where: {
            id: {
                [Op.eq]: request.params.product,
            },
        },
    })
        .then(() => {
            return response.redirect(
                redirectRoute('admin.products.list').path
            );
        })
        .catch(error => {
            console.log(error);
        });
};