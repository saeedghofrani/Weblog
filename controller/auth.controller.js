const User = require('../model/user.model');
const safeCall = require('../utils/safeCall.utils');

//login controller
const login = (_request, response, _next) => {
    return response.render('login');
};

//login procces controller
const loginProcess = safeCall(async (request, response, _next) => {
    const { username, password } = request.body;
    const user = await User.findOne({ username, password });
    if (!user)
        return response.render('login', { ERROR: "wrong username or password" });
    request.session.user = user;
    return response.redirect('/dashboard');
});

//register controller
const register = (_request, response, _next) => {
    response.render('register');
};

//register procces controller
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

//logout controller
const logout = (req, res, _next) => {
    res.clearCookie('user_sid');
    req.session.destroy();
    return res.redirect('/login');
};

module.exports = { login, loginProcess, register, registerProcess, logout };