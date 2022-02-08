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
    const myArticle = await Article.find({ author: user._id });
    console.log(myArticle);
    response.render('article', { data: myArticle });
});

const addArticlePage = (request, response, _next) => {
    response.render('addArticle')
}

const addArticleProcess = safeCall(async (request, response, _next) => {

    const data = {
        title: request.body.title,
        content: request.body.content,
        image: request.file.filename,
        author: request.session.user._id
    }
    const article = await Article.create(data);
    if (!article) {
        response.send('error');
    }
    response.redirect('/articles/myArticle');

});


module.exports = {
    articles,
    article,
    myArticle,
    addArticlePage,
    addArticleProcess
};