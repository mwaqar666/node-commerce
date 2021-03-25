const Controller = require(pathGenerator.controllerPath('Controller'));

class AboutUsController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    showAbout(request, response) {
        return response.render('app/pages/about-us');
    }
}

module.exports = new AboutUsController;
