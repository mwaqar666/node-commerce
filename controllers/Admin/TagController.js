const Controller = require(pathGenerator.controllerPath('Controller'));
const Tag = require(pathGenerator.modelPath('Tag'));

class TagController extends Controller {

    parentPageTitle = 'Tag';
    viewsDirectory = 'admin/tag';

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    list(request, response) {
        const title = 'List';
        return response.render(`${this.viewsDirectory}/list`, {title, parentPageTitle: this.parentPageTitle});
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

module.exports = TagController;
