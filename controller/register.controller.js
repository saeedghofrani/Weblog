const User = require('../model/user.model');
const safeCall = require('../utils/safeCall.utils');
const register = (_request, response, _next) => {
    response.render('register');
};
const registerProcess = safeCall(async (request, response, _next) => {
    if (response.locals.error)
        return response.render('register', { ERROR: response.locals.message });
    const data = { username, password, firstName, lastName, phone } = request.body;
    const user = await User.create(data);
    if (!user)
        return response.render('register', { ERROR: 'creating user was unsuccessful' });
    request.session.user = user;
    return response.redirect('/login');
});
module.exports = { register, registerProcess };