//aticle model
const Article = require('../model/article.model');
const User = require('../model/user.model');
// wrapper contain trycatch for error handling
const safeCall = require('../utils/safeCall.utils');

const { join } = require('path');
const fs = require('fs');

//render article page 
const articles = safeCall(async (request, response, _next) => {
    //get condition from param
    const condition = request.params.condition;
    //get all article
    if (condition.split('=')[0] === 'all') {
        const skip = Number(condition.split('=')[1]) * 5;
        //collect data from database sort bt createdAt
        const articles = await Article.find({}).populate('author').sort({ createdAt: -1 }).skip(skip).limit(6);
        //colect most visit Count articles 
        const visitCount = await Article.find({}).populate('author').sort({ visitCount: -1 });
        //render artile page sorted 
        if (request.session) {
            return response.render('./article/articles', { data: articles, topArticle: visitCount, user: request.session.user, count: visitCount.length });
        }
        return response.render('./article/articles', { data: articles, topArticle: visitCount, count: visitCount.length });
    }

    //get users article
    if (condition === 'myArticle') {
        //collect user data from session
        const user = request.session.user;
        //check for session
        if (!user) {
            return response.redirect('/auth/login');
        }
        //find article writed by user
        // const myArticle = await Article.find({ author: user._id }).populate('author').sort({ createdAt: -1 });
        const myArticle = await Article.find({ $or: [{ 'author': user._id }, { 'CoAuthor': user._id }] }).populate('author').sort({ createdAt: -1 });
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

//render add article page
const addArticlePage = (request, response, _next) => {
    response.render('./article/addArticle');
}

//add article procces 
const addArticleProcess = safeCall(async (request, response, _next) => {
    //validation for aticle input
    if (response.locals.error)
        return response.status(400).send({
            success: false,
            message: response.locals.message,
            data: null
        });

    //collect user data from session
    let data = {
        title: request.body.title,
        content: request.body.content,
        description: request.body.description,
        image: request.file.filename,
        author: request.session.user._id
    };


    if (request.body.CoAuthor) {
        const CoAuthor = await User.findOne({ username: request.body.CoAuthor });
        data.CoAuthor = CoAuthor._id;
    }
    //create article
    const article = await Article.create(data);
    //error handling for create
    if (!article) {
        return response.status(500).send({
            success: false,
            message: 'Article not created',
            data: null
        });
    }
    //send success message
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
    const article = await Article.findById(id);

    //error handling for MODEL.findByIdAndDelete
    if (!article)
        return response.status(400).send({
            success: false,
            message: 'delete article was unsuccesfull',
        });

    const deletedArticle = await Article.deleteOne(article);

    if (!deletedArticle)
        return response.status(400).send({
            success: false,
            message: 'delete article was unsuccesfull',
        });

    fs.unlinkSync(join(__dirname, "../public/images/article", article.image));

    //send success message
    response.status(200).send({
        success: true,
        message: 'delete article was succesfull',
    });

});
//update article page 
const updateArticlePage = safeCall(async (request, response, _next) => {

    const article = await Article.findById(request.params.id).populate('author').populate('CoAuthor');
    response.render('./article/updateArticle', { data: article });
});
//update article process
const updateArticleProcess = safeCall(async (request, response, _next) => {

    //validation for update article
    if (response.locals.error)
        return response.status(400).send({
            success: false,
            message: response.locals.message,
            data: null
        });

    let article = await Article.findById(request.params.id);

    //error handling for findByIdAndUpdate
    if (!article)
        return response.status(400).send({
            success: false,
            message: 'update article was unsuccesfull',
        });

    const passImage = article.image;

    article.title = request.body.title;
    article.content = request.body.content;
    article.description = request.body.description;
    article.image = article.image;


    if (request.file) {
        article.image = request.file.filename;
        await article.save();
        fs.unlinkSync(join(__dirname, "../public/images/article", passImage));
    } else {
        await article.save();
    }

    //send success message
    response.status(200).send({
        success: true,
        message: 'delete article was succesfull',
    });

});

const favorit = safeCall(async (request, response, next) => {

    const id = request.params.id;

    const article = await Article.findById(id);

    if (!request.session) {
        return response.status(401).send({
            success: false,
            message: 'please login first',
        });
    }

    const user = request.session.user;

    if (request.body.data === "1") {
        article.favorit++;
        const updatedUer = await User.findByIdAndUpdate(user._id, { "$push": { "favorites": article._id } }, { new: true }).populate('favorites');
        await article.save();
        request.session.user = updatedUer;
        return response.status(200).send({
            success: true,
            message: 'article favorit',
        });
    }

    article.favorit--;
    const updatedUer = await User.findByIdAndUpdate(user._id, { "$pullAll": { "favorites": article._id } }, { new: true }).populate('favorites');
    await article.save();
    request.session.user = updatedUer;
    return response.status(200).send({
        success: true,
        message: 'article favorit',
    });

});

module.exports = {
    articles,
    addArticlePage,
    addArticleProcess,
    delMyArticle,
    updateArticleProcess,
    updateArticlePage,
    favorit
};