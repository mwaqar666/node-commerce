const Controller = require(pathGenerator.controllerPath('Controller'));

class AccountController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    showAccount(request, response) {
        return response.render('app/pages/account');
    }
}

module.exports = new AccountController;
