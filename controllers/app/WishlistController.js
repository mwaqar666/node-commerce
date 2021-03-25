const Controller = require(pathGenerator.controllerPath('Controller'));

class WishlistController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    showWishlist(request, response) {
        return response.render('app/pages/wishlist');
    }
}

module.exports = new WishlistController;
