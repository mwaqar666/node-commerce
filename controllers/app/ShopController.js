exports.shopOne = (request, response) => {
    return response.render('app/pages/shop-3-column');
};

exports.shopTwo = (request, response) => {
    return response.render('app/pages/shop-4-column');
};

exports.shopThree = (request, response) => {
    return response.render('app/pages/shop-left-sidebar');
};

exports.shopFour = (request, response) => {
    return response.render('app/pages/shop-right-sidebar');
};