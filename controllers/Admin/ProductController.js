const modelPath = pathGenerator.modelPath;
const Product = require(modelPath('Product'));

const parentPageTitle = 'Product';

exports.list = (request, response) => {
    const title = 'List';
    return response.render('admin/product/list', { title, parentPageTitle });
};

exports.create = (request, response) => {

};

exports.store = (request, response) => {

};

exports.view = (request, response) => {

};

exports.edit = (request, response) => {

};

exports.update = (request, response) => {

};

exports.delete = (request, response) => {

};