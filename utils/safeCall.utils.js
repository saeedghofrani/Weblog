// const { Error } = require('mongoose');
// const { MongoError } = require('mongodb');
const safeCallUtils = function (mainFunc, req, res, next) {
    return function () {
        try {
            mainFunc.apply(this, arguments);
        } catch (error) {
            next(error);
        }
    };
};
module.exports = safeCallUtils;