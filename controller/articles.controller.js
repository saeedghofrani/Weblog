const Article = require('../model/article.model');
const safeCall = require('../utils/safeCall.utils');
const articles = safeCall(async (_request, response, _next) => {
    const articles = await Article.find({});    console.log(articles);
    return response.render('articles', { data: articles });
});
const article = safeCall(async (request, response, _next) => {
    const id = request.params.id;
    const article = await Article.findById(id);
    return response.render('article', { data: [article] });
});
const myArticle = safeCall(async (request, response, _next) => {
    const user = request.session.user;
});
module.exports = { articles, article };