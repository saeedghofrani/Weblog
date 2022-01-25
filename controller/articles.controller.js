const Article = require('../model/article.model');
const articles = async (_request, response, _next) => {
    const articles = await Article.find({});    console.log(articles);
    return response.render('articles', { data: articles });
};
const article = async (request, response, _next) => {
    const id = request.params.id;
    const article = await Article.findById(id);
    return response.render('articles', { data: article });
};
module.exports = { articles, article };