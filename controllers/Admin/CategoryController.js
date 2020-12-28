const modelPath = pathGenerator.modelPath;
const Category = require(modelPath('Category'));

const parentPageTitle = 'Category';
const viewsDirectory = 'admin/category';

exports.list = (request, response) => {
    const title = 'List';
    return response.render(`${viewsDirectory}/list`, { title, parentPageTitle });
};

exports.create = (request, response) => {
    const title = 'Create';
    return response.render(`${viewsDirectory}/create`, { title, parentPageTitle });
};

exports.store = (request, response) => {

};

exports.view = (request, response) => {
    const title = 'View';
    return response.render(`${viewsDirectory}/view`, { title, parentPageTitle });
};

exports.edit = (request, response) => {
    const title = 'Edit';
    return response.render(`${viewsDirectory}/edit`, { title, parentPageTitle });
};

exports.update = (request, response) => {

};

exports.delete = (request, response) => {

};