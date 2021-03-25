const Controller = require(pathGenerator.controllerPath('Controller'));
const Category = require(pathGenerator.modelPath('Category'));

class CategoryController extends Controller {

    parentPageTitle = 'Category';
    viewsDirectory = 'admin/category';

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    list(request, response) {
        const title = 'List';
        const dataColumns = ['id', 'name', 'image', 'status'];

        Category.findAll({attributes: dataColumns})
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

    }

    view(request, response) {
        const title = 'View';
        return response.render(`${this.viewsDirectory}/view`, {title, parentPageTitle: this.parentPageTitle});
    }

    edit(request, response) {
        const title = 'Edit';
        return response.render(`${this.viewsDirectory}/edit`, {title, parentPageTitle: this.parentPageTitle});
    }

    update(request, response) {

    }

    delete(request, response) {

    }
}

module.exports = new CategoryController;
