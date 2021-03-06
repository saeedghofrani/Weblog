// user model
const User = require('../model/user.model');
const deletePicture = require('../utils/deletePicture.utils');
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
        phone,
        avatar,
        favorites
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
    const updatedUser = await User.findByIdAndUpdate(user._id, data, { new: true }).populate('favorites').lean();

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

});

//update avatar
const avatarProcess = safeCall(async (request, response, next) => {

    //update user by avatar
    const user = await User.findByIdAndUpdate(request.session.user._id, { avatar: request.file.filename }, { new: true }).lean();

    //error handling for MODEL.findOneAndUpdate
    if (!user) {
        return response.status(400).send({
            success: false,
            message: 'user update was unsuccessfully.',
            data: null
        });
    }

    if (request.session.user.avatar !== "profileAvatar.jpg") {
        //delete old avatar
        deletePicture("../public/images/avatars", request.session.user.avatar);
    }
    //session user
    request.session.user = user;

    //redirect to dashboard
    return response.status(200).send({
        success: true,
        message: 'user updated successfully.',
        data: null
    });

});

module.exports = {
    dashboard,
    dashboardProcess,
    avatarProcess
};