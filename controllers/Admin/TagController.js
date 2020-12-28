const modelPath = pathGenerator.modelPath;
const Tag = require(modelPath('Tag'));

const parentPageTitle = 'Tag';
const viewsDirectory = 'admin/tag';

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