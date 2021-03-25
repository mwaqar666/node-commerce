const Controller = require(pathGenerator.controllerPath('Controller'));

class LoginRegisterController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    showLoginRegister(request, response) {
        return response.render('app/pages/login-register');
    }
}

module.exports = new LoginRegisterController;
