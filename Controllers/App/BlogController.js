const Controller = require(pathGenerator.controllerPath('Controller'));

class BlogController extends Controller {

    // file deepcode ignore NoRateLimitingForExpensiveWebOperation: Will work on that later
    blogOne(request, response) {
        return response.render('app/pages/blog-grid-3-column');
    }

    blogTwo(request, response) {
        return response.render('app/pages/blog-grid-4-column');
    }

    blogThree(request, response) {
        return response.render('app/pages/blog-grid-left-sidebar');
    }

    blogFour(request, response) {
        return response.render('app/pages/blog-grid-right-sidebar');
    }

    blogFive(request, response) {
        return response.render('app/pages/blog-list-left-sidebar');
    }

    blogSix(request, response) {
        return response.render('app/pages/blog-list-right-sidebar');
    }

    blogSeven(request, response) {
        return response.render('app/pages/blog-single');
    }

    blogEight(request, response) {
        return response.render('app/pages/blog-single-left-sidebar');
    }

    blogNine(request, response) {
        return response.render('app/pages/blog-single-right-sidebar');
    }
}

module.exports = BlogController;
