const Controller = require(pathGenerator.controllerPath('Controller'));

class HomeController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    indexOne(request, response) {
        return response.render('app/pages/index');
    }

    indexTwo(request, response) {
        return response.render('app/pages/index-2');
    }
}

module.exports = HomeController;
