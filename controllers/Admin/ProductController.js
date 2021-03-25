const {Op} = require('sequelize');
const Controller = require(pathGenerator.controllerPath('Controller'));
const Product = require(pathGenerator.modelPath('Product'));
const utils = require(pathGenerator.utilsPath('utils'));

class ProductController extends Controller {

    parentPageTitle = 'Product';
    viewsDirectory = 'admin/product';

    list(request, response) {
        const title = 'List';
        const dataColumns = ['id', 'name', 'regularPrice', 'discountPrice', 'quantity', 'image', 'featured', 'sale', 'status'];

        Product.findAll({
            attributes: dataColumns,
        })
            .then(data => {
                return response.render(`${this.viewsDirectory}/list`, {dataColumns, data, title, parentPageTitle: this.parentPageTitle});
            })
            .catch(error => {
                console.log(error);
            });
    }

    create(request, response) {
        const title = 'Create';
        return response.render(`${this.viewsDirectory}/create`, {title, parentPageTitle: this.parentPageTitle});
    }

    store(request, response) {
        const product = request.body;
        delete product.files;
        product.slug = utils.createSlug(product.name);

        Product.create(product)
            .then(() => {
                return response.redirect(
                    this.redirectRoute('admin.products.list').path
                );
            })
            .catch(error => {
                console.log(error);
            });
    }

    view(request, response) {
        const title = 'View';

        Product.findOne({
            where: {
                id: {
                    [Op.eq]: request.params.product,
                },
            },
        })
            .then(product => {
                return response.render(`${this.viewsDirectory}/view`, {product, title, parentPageTitle: this.parentPageTitle});
            })
            .catch(error => {
                console.log(error);
            });
    }

    edit(request, response) {
        const title = 'Edit';

        Product.findOne({
            where: {
                id: {
                    [Op.eq]: request.params.product,
                },
            },
        })
            .then(product => {
                return response.render(`${this.viewsDirectory}/edit`, {product, title, parentPageTitle: this.parentPageTitle});
            })
            .catch(error => {
                console.log(error);
            });
    }

    update(request, response) {
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
                    this.redirectRoute('admin.products.list').path
                );
            })
            .catch(error => {
                console.log(error);
            });
    }

    delete(request, response) {
        Product.destroy({
            where: {
                id: {
                    [Op.eq]: request.params.product,
                },
            },
        })
            .then(() => {
                return response.redirect(
                    this.redirectRoute('admin.products.list').path
                );
            })
            .catch(error => {
                console.log(error);
            });
    }
}

// exports.list = (request, response) => {
//
// };
//
// exports.create = (request, response) => {
//
// };
//
// exports.store = (request, response) => {
//
// };
//
// exports.view = (request, response) => {
//
// };
//
// exports.edit = (request, response) => {
//
// };
//
// exports.update = (request, response) => {
//
// };
//
// exports.delete = (request, response) => {
//
// };
module.exports = ProductController;