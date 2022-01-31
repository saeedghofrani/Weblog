// validation function
const { usernameValidation, firstNameValidation, lastNameValidation, passwordValidation, phoneValidation, emailValidation } = require('../utils/validation.utils');
const createError = require('http-errors');
// wraper for diffrent senarios
const wraper = (mod) => {
    return userValidation = async (req, res, next) => {
        try {
            // create validation
            if (mod === 'create') {
                res.locals = { error: false, message: [] };
                //username validation
                usernameValidation(req, res);
                //first name validation
                firstNameValidation(req, res);
                //last name validation
                lastNameValidation(req, res);
                //password validation
                passwordValidation(req, res);
                //phone validation
                phoneValidation(req, res);
                next();
            }
            //update validation
            if (mod === 'update') {
                res.locals = { error: false, message: [] };
                //username validation
                usernameValidation(req, res);
                //first name validation
                firstNameValidation(req, res);
                //last name validation
                lastNameValidation(req, res);
                //phone validation
                phoneValidation(req, res);
                //email validation
                emailValidation(req, res);
                next();
            }
        } catch (error) {
            next(createError(500));
        }
    };
}

module.exports = wraper;