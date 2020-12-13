exports.shopOne = (request, response) => {
    return response.render('app/pages/shop-grid-3-column');
};

exports.shopTwo = (request, response) => {
    return response.render('app/pages/shop-grid-4-column');
};

exports.shopThree = (request, response) => {
    return response.render('app/pages/shop-grid-left-sidebar');
};

exports.shopFour = (request, response) => {
    return response.render('app/pages/shop-grid-right-sidebar');
};

exports.shopFive = (request, response) => {
    return response.render('app/pages/shop-grid-list');
};

exports.shopSix = (request, response) => {
    return response.render('app/pages/shop-grid-list-left-sidebar');
};

exports.shopSeven = (request, response) => {
    return response.render('app/pages/shop-grid-list-right-sidebar');
};