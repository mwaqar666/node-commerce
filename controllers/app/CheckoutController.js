const Controller = require(pathGenerator.controllerPath('Controller'));

class CheckoutController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    showCheckout(request, response) {
        return response.render('app/pages/checkout');
    }
}

module.exports = new CheckoutController;
