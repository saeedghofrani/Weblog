// try catch function for error handling
const safeCall = require('../utils/safeCall.utils');
//user model
const User = require('../model/user.model');

//render table user for admin
const admin = safeCall(async (request, response, _next) => {
    //collect users from database
    const users = await User.find({});
    response.render('admin', { users });

});

//add an admin from admin pannel
const adminProcess = safeCall(async (request, response, _next) => {

    // check for validation errors
    if (response.locals.error)
        return response.status(400).send({
            success: false,
            message: `creating admin was unsuccessful`,
            data: response.locals.message
        });

    //collect data from request
    const data = {
        username,
        password,
        firstName,
        lastName,
        phone,
        role,
        gender,
        email,
        status,
    } = request.body;

    //create user
    const user = await User.create(data);

    //error handling for MODEL.CREATE
    if (!user)
        return response.status(400).send({
            success: false,
            message: `creating admin was unsuccessful`,
            data: null
        });

    // send succesfull message with user info
    return response.status(200).send({
        success: true,
        message: `creating admin was unsuccessful`,
        data: user
    });

});

module.exports = {
    admin,
    adminProcess
};