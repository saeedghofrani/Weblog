// Module dependencies.
const bcrypt = require('bcryptjs');
//user model
const User = require('../model/user.model');
// wrapper contain trycatch for error handling
const safeCall = require('../utils/safeCall.utils');


//render login page
const login = (_request, response, _next) => {
    return response.render('login');
};

//check username and password for access to dashboard
const loginProcess = safeCall(async (request, response, _next) => {
    // get user pass from request
    const { username, password } = request.body;
    // find user by username and get password
    const user = await User.findOne({ username }).select('+password');
    console.log(user);
    // send error case of wrong username 
    if (!user)
        return response.render('login', {
            ERROR: "wrong username or password"
        });

    //compaire password
    const userPass = await bcrypt.compare(password, user.password);
    console.log(userPass);
    // send error case of wrong password
    if (!userPass)
        return response.render('login', {
            ERROR: "wrong username or password"
        });
    //set session for user 
    request.session.user = user;
    //redirect to dashboard route
    return response.redirect('/dashboard');
});

//render Rigester page
const register = (_request, response, _next) => {
    response.render('register');
};

//create acount 
const registerProcess = safeCall(async (request, response, _next) => {
    //validation error handler 
    if (response.locals.error)
        return response.render('register', {
            ERROR: response.locals.message
        });

    // collect data from request body (form)
    const data = {
        username,
        password,
        firstName,
        lastName,
        phone
    } = request.body;

    //create admin with api 
    data.role = request.body.role || 'user';

    //create user by collected data
    const user = await User.create(data);
    //error handling for MODEL.CREATE
    if (!user)
        return response.render('register', {
            ERROR: 'creating user was unsuccessful'
        });
    //set session for user
    request.session.user = user;
    //redirect to dashboard
    return response.redirect('/dashboard');
});

//logout controller 
const logout = (request, response, _next) => {
    //remove browser cookies
    response.clearCookie('user_sid');
    //remove session 
    request.session.destroy();
    // redirect to login page
    return response.redirect('/auth/login');

};

// //re
// const pass = (request, response, _next) => {

//     response.render('pass');

// };

// const passProcces = async (request, response, next) => {

//     const { oldPass, newPass, confPass } = request.body;

//     if (newPass !== confPass)
//         return response.status(400).send({
//             success: false,
//             message: 'password don`t match',
//         });

//     const user = request.session.user;

//     const userTarget = await User.findById(user._id).select('+password');

//     if (!userTarget)
//         return response.status(400).send({
//             success: false,
//             message: 'update was unsuccesfull',
//         });

//     const passUpdate = await User.findOneAndUpdate({ _id: userTarget._id }, { password: newPass })

//     if (!passUpdate)
//         return response.status(400).send({
//             success: false,
//             message: 'update was succesfull',
//         });

//     return response.status(200).send({
//         success: true,
//         message: 'update was succesfull',
//     });
// };

// //delete user acount
// const delAccount = safeCall(async (request, response, _next) => {
//     // get user data from session
//     const user = request.session.user;
//     //delete user by id
//     await User.findByIdAndDelete(user._id);
//     //redirect to logout 
//     response.redirect('/auth/logout');

// });

module.exports = {
    login,
    loginProcess,
    register,
    registerProcess,
    logout,
    // pass,
    // passProcces,
    delAccount
};