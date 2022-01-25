const home = async (_request, response, _next) => {
    return response.render('home');
};
module.exports = home;