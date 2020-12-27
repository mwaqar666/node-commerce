exports.blogOne = (request, response) => {
    return response.render('app/pages/blog-grid-3-column');
};

exports.blogTwo = (request, response) => {
    return response.render('app/pages/blog-grid-4-column');
};

exports.blogThree = (request, response) => {
    return response.render('app/pages/blog-grid-left-sidebar');
};

exports.blogFour = (request, response) => {
    return response.render('app/pages/blog-grid-right-sidebar');
};

exports.blogFive = (request, response) => {
    return response.render('app/pages/blog-list-left-sidebar');
};

exports.blogSix = (request, response) => {
    return response.render('app/pages/blog-list-right-sidebar');
};

exports.blogSeven = (request, response) => {
    return response.render('app/pages/blog-single');
};

exports.blogEight = (request, response) => {
    return response.render('app/pages/blog-single-left-sidebar');
};

exports.blogNine = (request, response) => {
    return response.render('app/pages/blog-single-right-sidebar');
};