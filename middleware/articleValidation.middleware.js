const { titleValidation, descriptionValidation, contentValidation, imageValidation } = require('../utils/articleValidation.utils');
const articleValidation = (req, res, next) => {
    res.locals = { error: false, message: [] };
    titleValidation(req, res);
    descriptionValidation(req, res);
    contentValidation(req, res);
    imageValidation(req, res);
};
module.exports = articleValidation;