//aticle model
const Article = require('../model/article.model');
// wrapper contain trycatch for error handling
const safeCall = require('../utils/safeCall.utils');

//render article page 
const articles = safeCall(async (request, response, _next) => {

    const condition = request.params.condition;

    //all article
    if (condition === 'all') {
        //collect data from database sort bt createdAt
        const articles = await Article.find({}).populate('author').sort({ createdAt: -1 });
        //colect most visit Count articles 
        const visitCount = await Article.find({}).populate('author').sort({ visitCount: -1 }).limit(4);
        //render artile page sorted 
        return response.render('./article/articles', { data: articles, topArticle: visitCount });
    }

    //my article
    if (condition === 'myArticle') {
        //collect user data from session
        const user = request.session.user;
        if (!user) {
            return response.redirect('/auth/login');
        }
        //find article writed by user
        const myArticle = await Article.find({ author: user._id }).populate('author').sort({ createdAt: -1 });
        ///render article page with data
        response.render('./article/myArticles', { data: myArticle });
    }

    
    else {

        //get article id from request params
        const id = request.params.condition;
        //find article from database
        const article = await Article.findById(id).populate('author');
        //add visit count of article 
        if (request.session.user && request.session.user.username !== article.author.username || !request.session.user) {
            article.visitCount++;
            article.save();
        }
        //render article page 
        return response.render('./article/article', { data: article });

    }
});


const addArticlePage = (request, response, _next) => {
    response.render('./article/addArticle');
}

const addArticleProcess = safeCall(async (request, response, _next) => {

    if (response.locals.error)
        return response.status(400).send({
            success: false,
            message: response.locals.message,
            data: null
        });

    //collect user data from session
    const data = {
        title: request.body.title,
        content: request.body.content,
        description: request.body.description,
        image: request.file.filename,
        author: request.session.user._id
    };

    const article = await Article.create(data);

    if (!article) {
        return response.status(500).send({
            success: false,
            message: 'Article not created',
            data: null
        });
    }

    return response.status(200).send({
        success: true,
        message: 'Article created',
        data: null
    });

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
        description: request.body.description,
        image: request.file.filename,
    };

    await Article.findByIdAndUpdate(request.body.id, data);

    return response.redirect('/articles/myArticle')
});

module.exports = {
    articles,
    addArticlePage,
    addArticleProcess,
    delMyArticle,
    updateArticleProcess,
    updateArticlePage
};