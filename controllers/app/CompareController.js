const Controller = require(pathGenerator.controllerPath('Controller'));

class CompareController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    showCompare(request, response) {
        return response.render('app/pages/compare');
    }
}

module.exports = new CompareController;
