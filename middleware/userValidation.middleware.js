const { usernameValidation, firstNameValidation, lastNameValidation, passwordValidation, phoneValidation, emailValidation } = require('../utils/validation.utils');
const createError = require('http-errors');
const wraper = (mod) => {
    return userValidation = async (req, res, next) => {
        try {
            if (mod === 'create') {
                res.locals = { error: false, message: [] };
                usernameValidation(req, res);
                firstNameValidation(req, res);
                lastNameValidation(req, res);
                passwordValidation(req, res);
                phoneValidation(req, res);
                next();
            }
            if (mod === 'update') {
                res.locals = { error: false, message: [] };
                console.log(req.body);
                usernameValidation(req, res);
                firstNameValidation(req, res);
                lastNameValidation(req, res);
                phoneValidation(req, res);
                emailValidation(req, res);
                next();
            }
        } catch (error) {
            next(createError(500));
        }
    };
}

module.exports = wraper;