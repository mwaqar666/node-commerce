const Controller = require(pathGenerator.controllerPath('Controller'));

class ShopController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    shopOne(request, response) {
        return response.render('app/pages/shop-3-column');
    }

    shopTwo(request, response) {
        return response.render('app/pages/shop-4-column');
    }

    shopThree(request, response) {
        return response.render('app/pages/shop-left-sidebar');
    }

    shopFour(request, response) {
        return response.render('app/pages/shop-right-sidebar');
    }
}

module.exports = new ShopController;
