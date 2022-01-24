const User = require('../model/user.model');
const login = (_request, response, _next) => {
    console.log('ddddddddddddsss');
    return response.render('login', { ERROR: "" });
};
const loginProcess = async (request, response, _next) => {
    const { username, password } = request.body;
    const user = await User.findOne({ username, password });
    if (!user)
        return response.render('login', { ERROR: "wrong username or password" });
    request.session.user = user;
    return response.redirect('/dashboard');
};
module.exports = { login, loginProcess };