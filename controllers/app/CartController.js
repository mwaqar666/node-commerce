const Controller = require(pathGenerator.controllerPath('Controller'));

class CartController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    showCart(request, response) {
        return response.render('app/pages/cart');
    }
}

module.exports = new CartController;
