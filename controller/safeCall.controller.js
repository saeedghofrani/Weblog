const createError = require('http-errors');
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