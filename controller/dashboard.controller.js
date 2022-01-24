const User = require('../model/user.model');
const dashboard = (request, response, _next) => {
    const data = { firstName, lastName, username, password, gender, phone } = request.session.user;
    return response.render('dashboard', { data: data });
};
const dashboardProcess = async (request, response, _next) => {
    if (response.locals.error)
        return response.status(400).send({ success: false, message: 'user update was unsuccessfully.', data: response.locals.message });
    const user = request.session.user;
    const data = { firstName, lastName, username, password, gender, phone } = request.body;
    const updatedUser = await User.findOneAndUpdate(user, data, { new: true, overwrite: true }).lean();
    if (!updatedUser)
        return response.status(400).send({ success: false, message: 'user update was unsuccessfully.', data: updatedUser });
    request.session.user = updatedUser;
    return response.status(200).send({ success: true, message: 'user updated successfully.', data: updatedUser });
};
module.exports = { dashboard, dashboardProcess };