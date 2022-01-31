//aticle model
const Article = require('../model/article.model');
// wrapper contain trycatch for error handling
const safeCall = require('../utils/safeCall.utils');

//render article page 
const articles = safeCall(async (_request, response, _next) => {
    //collect data from database
    const articles = await Article.find({});
    return response.render('articles', { data: articles });

});

//render an article page
const article = safeCall(async (request, response, _next) => {

    //get article id from request params
    const id = request.params.id;
    //find article from database
    const article = await Article.findById(id);
    return response.render('article', { data: [article] });

});

const myArticle = safeCall(async (request, response, _next) => {

    const user = request.session.user;
    
});

module.exports = { 
    articles, 
    article, 
    myArticle 
};