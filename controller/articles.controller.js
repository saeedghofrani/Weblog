//aticle model
const Article = require('../model/article.model');
// wrapper contain trycatch for error handling
const safeCall = require('../utils/safeCall.utils');

//render article page 
const articles = safeCall(async (_request, response, _next) => {
    //collect data from database 
    const articles = await Article.find({}).populate('author').sort({ createdAt: -1 });
    console.log(articles);
    return response.render('./article/articles', { data: articles });

});

//render an article page
const article = safeCall(async (request, response, _next) => {

    //get article id from request params
    const id = request.params.id;
    //find article from database
    const article = await Article.findById(id).populate('author');;
    return response.render('./article/article', { data: article });

});

const myArticle = safeCall(async (request, response, _next) => {
    const user = request.session.user;
    const myArticle = await Article.find({ author: user._id }).populate('author').sort({ createdAt: -1 });;
    console.log(myArticle);
    response.render('./article/myArticles', { data: myArticle });
});

const addArticlePage = (request, response, _next) => {
    response.render('./article/addArticle')
}

const addArticleProcess = safeCall(async (request, response, _next) => {

    const data = {
        title: request.body.title,
        content: request.body.content,
        description: request.body.description,
        image: request.file.filename,
        author: request.session.user._id
    };

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