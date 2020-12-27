exports.productOne = (request, response) => {
    return response.render('app/pages/single-product');
};

exports.productTwo = (request, response) => {
    return response.render('app/pages/single-product-configurable');
};

exports.productThree = (request, response) => {
    return response.render('app/pages/single-product-group');
};