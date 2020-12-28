const parentPageTitle = 'Dashboard';

exports.index = (request, response) => {
    return response.render('admin/dashboard', { parentPageTitle });
};