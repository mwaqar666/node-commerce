const Controller = require(pathInstance.getControllerPath('Controller'));
const ProductAttribute = require(pathInstance.getModelPath('ProductAttribute'));

class ProductAttributeController extends Controller {

    parentPageTitle = 'ProductAttribute';
    viewsDirectory = 'admin/product-attribute';

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will take care of that later
    list(request, response) {
        const title = 'List';
        const dataColumns = [];

        ProductAttribute.findAll({attributes: dataColumns})
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
        const productAttribute = request.body;
        delete productAttribute.files;
        productAttribute.slug = utilities.generalUtils.createSlug(productAttribute.name);

        ProductAttribute.create(productAttribute)
            .then(() => {
                return response.redirect(
                    this.redirectRoute('admin.product-attributes.list').path
                );
            })
            .catch(error => {
                console.log(error);
            });
    }

    view(request, response) {
        const title = 'View';

        ProductAttribute.findOne({
            where: {
                id: request.params.product,
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

        ProductAttribute.findOne({
            where: {
                id: request.params.product,
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

        ProductAttribute.update(updatedProduct, {
            where: {
                id: request.params.product,
            },
        })
            .then(() => {
                return response.redirect(
                    this.redirectRoute('admin.product-attributes.list').path
                );
            })
            .catch(error => {
                console.log(error);
            });
    }

    delete(request, response) {
        ProductAttribute.destroy({
            where: {id: request.params.product},
        })
            .then(() => {
                return response.redirect(
                    this.redirectRoute('admin.product-attributes.list').path
                );
            })
            .catch(error => {
                console.log(error);
            });
    }
}

module.exports = ProductAttributeController;
