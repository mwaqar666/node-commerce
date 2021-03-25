const Controller = require(pathGenerator.controllerPath('Controller'));

class DashboardController extends Controller {

    parentPageTitle = 'Dashboard';
    viewsDirectory = 'admin/currency';

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    index(request, response) {
        return response.render(`${this.viewsDirectory}`, {parentPageTitle: this.parentPageTitle});
    }
}

module.exports = DashboardController;
