// user model
const User = require('../model/user.model');
// wrapper contain trycatch for error handling
const safeCall = require('../utils/safeCall.utils');
// const multer = require('multer');
// const upload = multer().single('avatar');

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
        avatar
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
    const updatedUser = await User.findByIdAndUpdate(user._id, data, { new: true }).lean();

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

    // upload(req, res, function (err) {
    //     if (err instanceof multer.MulterError) {
    //         return response.render('error', { error: { message: "internal error", status: 500 } });
    //     } else if (err) {
    //         return response.render('error', { error: { message: "internal error", status: 500 } });
    //     }
    //     next();
    // });

    //update user by avatar
    user = await User.findByIdAndUpdate(request.session.user._id, { avatar: request.file.filename }, { new: true });

    //session user
    request.session.user = user;

    //error handling for MODEL.findOneAndUpdate
    if (!user) {
        return response.render('error', { error: { message: "internal error", status: 500 } });
    }
    //redirect to dashboard
    response.redirect('/dashboard');

});

module.exports = {
    dashboard,
    dashboardProcess,
    avatarProcess
};