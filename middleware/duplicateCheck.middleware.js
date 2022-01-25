const User = require('../model/user.model');
const duplicate = {
    dashboard: async (req, res, next) => {
        if (req.session.user.username !== req.body.username && await User.findOne({ username: req.body.username })) {
            return res.status(400).send({ success: false, message: 'user update was unsuccessfully.' });
        }
        if (req.session.user.phone !== req.body.phone && await User.findOne({ phone: req.body.phone })) {
            return res.status(400).send({ success: false, message: 'user update was unsuccessfully.' });
        }
        next();
    },
    register: async (req, res, next) => {
        if (await User.findOne({ username: req.body.username })) {
            return res.render('register', { ERROR: "Please try again with diffrent input" });
        }
        if (await User.findOne({ phone: req.body.phone })) {
            return res.render('register', { ERROR: "Please try again with diffrent input" });
        }
        next();
    }
};
module.exports = duplicate;