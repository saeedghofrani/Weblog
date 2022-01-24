const validator = require('validator');
const User = require('../model/user.model');
const { Error } = require('mongoose');
const { MongoError } = require('mongodb');
const usernameValidation = async (req, res) => {
    let { username } = req.body;
    username = username.trim();
    const duplicate = await User.findOne({ username });
    if (!username || username === 'undefined' || username === 'null' || validator.isEmpty(username) || username.length < 5 || duplicate) {
        res.locals.error = true;
        res.locals.message.push('invalid username: username most be more than 5 letter and UNIQUE!!');
    }
};
const firstNameValidation = (req, res) => {
    let { firstName } = req.body;
    firstName = firstName.trim();
    if (!firstName || firstName === 'undefined' || firstName === 'null' || validator.isEmpty(firstName)) {
        res.locals.error = true;
        res.locals.message.push('invalid firstname: firstname is required!!');
    }
};
const lastNameValidation = (req, res) => {
    let { lastName } = req.body;
    lastName = lastName.trim();
    if (!lastName || lastName === 'undefined' || lastName === 'null' || validator.isEmpty(lastName)) {
        res.locals.error = true;
        res.locals.message.push('invalid lastname: lastname is required!!');
    }
};
const passwordValidation = (req, res) => {
    let { password } = req.body;
    password = password.trim();
    const reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!password || password === 'undefined' || password === 'null' || validator.isEmpty(password) || !reg.test(password) || password.length < 8) {
        res.locals.error = true;
        res.locals.message.push('invalid password: password is required and most be more than 8 character (uppercase letter, number, lowercase letter )!!');
    }
};
const phoneValidation = (req, res) => {
    let { phone } = req.body;
    phone = phone.trim();
    if (!phone || phone === 'undefined' || validator.isEmpty(phone) || !validator.isMobilePhone(phone)) {
        res.locals.error = true;
        res.locals.message.push('invalid phone: phone is required!!');
    }
};
const handler = (res, err, page) => {
    if (err instanceof Error.ValidationError) {
        return res.render(`${page}`, { ERROR: err });
    }
    if (err instanceof MongoError) {
        return res.render(`${page}`, { ERROR: err });
    }
    // err.status = err.status || 500;
    // return res.status(err.status).send({ success: false, message: err.message });
};
module.exports = { usernameValidation, firstNameValidation, lastNameValidation, passwordValidation, phoneValidation, handler };

