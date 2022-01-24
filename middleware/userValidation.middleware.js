const { usernameValidation, firstNameValidation, lastNameValidation, passwordValidation, phoneValidation } = require('../utils/validation.utils');
const createError = require('http-errors');
const userValidation = async (req, res, next) => {
    try {
        res.locals = { error: false, message: [] };
        usernameValidation(req, res);
        firstNameValidation(req, res);
        lastNameValidation(req, res);
        passwordValidation(req, res);
        phoneValidation(req, res);
        next();
    } catch (error) {

        next(createError(500));
    }
};
module.exports = userValidation;