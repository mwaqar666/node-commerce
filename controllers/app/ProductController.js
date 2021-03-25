const Controller = require(pathGenerator.controllerPath('Controller'));

class ProductController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    productOne(request, response) {
        return response.render('app/pages/single-product');
    }

    productTwo(request, response) {
        return response.render('app/pages/single-product-configurable');
    }

    productThree(request, response) {
        return response.render('app/pages/single-product-group');
    }
}

module.exports = new ProductController;
