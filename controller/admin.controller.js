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
console.log('.sssssss');

});

module.exports = {
    admin,
    resetPass
};