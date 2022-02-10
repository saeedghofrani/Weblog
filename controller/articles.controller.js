//aticle model
const Article = require('../model/article.model');
// wrapper contain trycatch for error handling
const safeCall = require('../utils/safeCall.utils');

//render article page 
const articles = safeCall(async (_request, response, _next) => {
    //collect data from database 
    const articles = await Article.find({}).populate('author').sort({ createdAt: -1 });
    return response.render('./article/articles', { data: articles });

});

//render an article page
const article = safeCall(async (request, response, _next) => {

    //get article id from request params
    const id = request.params.id;
    //find article from database
    const article = await Article.findById(id).populate('author');
    //render article page
    if (request.session.user && request.session.user.username !== article.author.username || !request.session.user) {
        article.visitCount++
        article.save();
    }

    return response.render('./article/article', { data: article });

});

const myArticle = safeCall(async (request, response, _next) => {
    const user = request.session.user;
    const myArticle = await Article.find({ author: user._id }).populate('author').sort({ createdAt: -1 });
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

const delMyArticle = safeCall(async (request, response, _next) => {

    //collect id from request
    const { id } = request.body;

    //delete article from database
    const deletedArticle = await Article.findByIdAndDelete(id);

    //error handling for MODEL.findByIdAndDelete
    if (!deletedArticle)
        return response.status(400).send({
            success: false,
            message: 'delete article was unsuccesfull',
        });

    //send success message
    response.status(200).send({
        success: true,
        message: 'delete article was succesfull',
    });

});

const updateArticlePage = safeCall(async (request, response, _next) => {
    const article = await Article.findById(request.params.id);
    response.render('./article/updateArticle', { data: article });
});

const updateArticleProcess = safeCall(async (request, response, _next) => {
    const data = {
        title: request.body.title,
        content: request.body.content,
        description: request.body.description
    };
    await Article.findByIdAndUpdate(request.body.id, data);
    return response.redirect('/articles/myArticle')
});

module.exports = {
    articles,
    article,
    myArticle,
    addArticlePage,
    addArticleProcess,
    delMyArticle,
    updateArticleProcess,
    updateArticlePage
};