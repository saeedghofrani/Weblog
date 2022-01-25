const User = require('../model/user.model');
const createError = require('http-errors');
const safeCall = require('./safeCall.controller');
const login = (_request, response, _next) => {
    return response.render('login', { ERROR: "" });
};
const loginProcess = safeCall(async (request, response, _next) => {
    const { username, password } = request.body;
    const user = await User.findOne({ username, password });
    if (!user)
        return response.render('login', { ERROR: "wrong username or password" });
    request.session.user = user;
    return response.redirect('/dashboard');
});
module.exports = { login, loginProcess };