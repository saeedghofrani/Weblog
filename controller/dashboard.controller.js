// user model
const User = require('../model/user.model');
// wrapper contain trycatch for error handling
const safeCall = require('../utils/safeCall.utils');

// render dashboard page
const dashboard = (request, response, _next) => {
    //collect data from session
    const data = {
        firstName,
        lastName,
        username,
        password,
        gender,
        phone
    } = request.session.user;

    return response.render('dashboard', { data: data });
};

// update user dashboard
const dashboardProcess = safeCall(async (request, response, _next) => {
    //validation error handler

    if (response.locals.error)
        return response.status(400).send({
            success: false,
            message: `user update was unsuccessfully.`,
            data: response.locals.message
        });

    //get user from session
    const user = request.session.user;

    //collect data from request body
    const data = {
        firstName,
        lastName,
        username,
        email,
        gender,
        phone,
    } = request.body;

    //update user by id 
    try {
        const updatedUser = await User.findOneAndUpdate(user._id, data, { new: true }).lean();

        //error handling for MODEL.findOneAndUpdate
        if (!updatedUser)
            return response.status(400).send({
                success: false,
                message: 'user update was unsuccessfully.',
                data: updatedUser
            });
        //update session 
        request.session.user = updatedUser;
        // send succes message with user
        return response.status(200).send({
            success: true,
            message: 'user updated successfully.',
            data: updatedUser
        });
    } catch (error) {
        response.status(400).send({
            success: false,
            message: error,
            data: null
        });
    }

});

module.exports = {
    dashboard,
    dashboardProcess
};