const modelPath = pathGenerator.modelPath;
const { redirectRoute } = require('./Controller');
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
            return response.render(`${viewsDirectory}/list`, { dataColumns, products, title, parentPageTitle });
        })
        .catch(error => {
            console.log(error);
        });
};

exports.create = (request, response) => {
    const title = 'Create';
    return response.render(`${viewsDirectory}/create`, { title, parentPageTitle });
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
    return response.render(`${viewsDirectory}/view`, { title, parentPageTitle });
};

exports.edit = (request, response) => {
    const title = 'Edit';
    return response.render(`${viewsDirectory}/edit`, { title, parentPageTitle });
};

exports.update = (request, response) => {

};

exports.delete = (request, response) => {

};