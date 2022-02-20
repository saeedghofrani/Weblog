const Article = require('../model/article.model');
const mongoose = require('mongoose');

const checkAccess = {
    deleteArticle: async (req, res, next) => {

        const { id } = req.body;
        const article = await Article.findById(id).populate('author');
        if (req.session.user._id !== mongoose.Types.ObjectId(article.author._id).valueOf()) {
            return res.render('./error', { error: { status: 404, message: "page not found" } });
        }
        next();

    },
    updateArticle: async (req, res, next) => {

        const article = await Article.findById(req.params.id).populate('author').populate('CoAuthor');

        if (req.session.user._id !== mongoose.Types.ObjectId(article.author._id).valueOf() && req.session.user._id !== mongoose.Types.ObjectId(article.CoAuthor._id).valueOf()) {
            return res.render('./error', { error: { status: 404, message: "page not found" } });
        }

        next();
    },
};

module.exports = checkAccess;
