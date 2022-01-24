const createError = require('http-errors');
const { Error } = require('mongoose');
const { MongoError } = require('mongodb');
var safeCall = function (mainFunc, req, res, next) {
    return function () {
        try {
            mainFunc.apply(this, arguments);
        } catch (error) {
            next(createError(500));
        }
    };
};
module.exports = safeCall;