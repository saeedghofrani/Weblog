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

const resetPass = safeCall(async (request, response, _next) => {
    const user = await User.findById(request.body.id).select('+password');

    if (!user)
        return response.status(400).send({
            success: false,
            message: 'reset password was unsuccesfull',
        });

    //validateBeforeSave
    user.password = user.phone;
    const savedUser = await user.save({ validateBeforeSave: false });

    //error handling for MODEL.SAVE
    if (!savedUser)
        return response.status(400).send({
            success: false,
            message: 'reset password was unsuccesfull',
        });

    //send success message
    return response.status(200).send({
        success: true,
        message: 'reset password was succesfull',
    });
});

module.exports = {
    admin,
    resetPass
};