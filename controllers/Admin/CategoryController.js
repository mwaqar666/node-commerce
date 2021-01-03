const {Op} = require('sequelize');
const modelPath = pathGenerator.modelPath;
const {redirectRoute} = require(pathGenerator.controllerPath('Controller'));
const Category = require(modelPath('Category'));
const {createSlug} = require(pathGenerator.utilsPath('utils'));

const parentPageTitle = 'Category';
const viewsDirectory = 'admin/category';

exports.list = (request, response) => {
    const title = 'List';
    const dataColumns = ['id', 'name', 'image', 'status'];

    Category.findAll({
        attributes: dataColumns,
    })
        .then(data => {
            return response.render(`${viewsDirectory}/list`, {dataColumns, data, title, parentPageTitle});
        })
        .catch(error => {
            console.log(error);
        });
};

exports.create = (request, response) => {
    const title = 'Create';
    return response.render(`${viewsDirectory}/create`, {title, parentPageTitle});
};

exports.store = (request, response) => {

};

exports.view = (request, response) => {
    const title = 'View';
    return response.render(`${viewsDirectory}/view`, {title, parentPageTitle});
};

exports.edit = (request, response) => {
    const title = 'Edit';
    return response.render(`${viewsDirectory}/edit`, {title, parentPageTitle});
};

exports.update = (request, response) => {

};

exports.delete = (request, response) => {

};