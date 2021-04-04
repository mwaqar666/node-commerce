const Controller = require(pathGenerator.controllerPath('Controller'));

class ContactUsController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    showContactUs(request, response) {
        return response.render('app/pages/contact-us');
    }
}

module.exports = ContactUsController;
