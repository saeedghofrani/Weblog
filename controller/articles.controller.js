//aticle model
const Article = require('../model/article.model');
const User = require('../model/user.model');
const Comment = require('../model/comment.model');
// wrapper contain trycatch for error handling
const safeCall = require('../utils/safeCall.utils');
const deletePicture = require('../utils/deletePicture.utils');

//render article page 
const articles = safeCall(async (request, response, _next) => {

    const condition = request.params.condition;

    if (condition === 'all') {
        const topArticle = await Article.find({}).populate('author').sort({ visitCount: -1 }).limit(1);
        return response.render('./article/articles', { topArticle, user: request.session.user });
    }

    if (condition.split('=')[0] === 'all') {

        const skip = Number(condition.split('=')[1]) * 6;
        //collect data from database sort bt createdAt
        const articles = await Article.find({}).populate('author').sort({ createdAt: -1 }).skip(skip).limit(6);
        const count = await Article.find({}).count();

        //render artile page sorted 
        return response.status(200).send({
            success: true,
            message: 'done',
            data: articles,
            count,
            user: request.session.user
        });

    }

    //get users article
    if (condition === 'myArticle') {

        const user = request.session.user;
        // const myArticle = await Article.find({ author: user._id }).populate('author').sort({ createdAt: -1 });
        const myArticle = await Article.find({ $or: [{ 'author': user._id }, { 'CoAuthor': user._id }] }).populate('author').sort({ createdAt: -1 });
        response.render('./article/myArticles', { data: myArticle });
    }

    else {
        const id = request.params.condition;
        const article = await Article.findById(id).populate('author');
        const comment = await Comment.find({ 'postId': article._id }).populate('username').populate({ path: 'parentCommentId', populate: { path: 'username' } });
        //add visit count of article 
        if (request.session.user.username !== article.author.username) {
            article.visitCount++;
            article.save();
        }
        return response.render('./article/article', { data: article, user: request.session.user, comment });
    }

});

//render add article page
const addArticlePage = (request, response, _next) => {
    response.render('./article/addArticle');
};

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
    const deleteComment = await Comment.deleteMany({ 'postId': id });

    if (!deletedArticle || !deleteComment)
        return response.status(400).send({
            success: false,
            message: 'delete article was unsuccesfull',
        });

    deletePicture("../public/images/article", article.image);

    //send success message
    response.status(200).send({
        success: true,
        message: 'delete article was succesfull',
    });

});
//update article page 
const updateArticlePage = safeCall(async (request, response, _next) => {

    const article = await Article.findById(request.params.id).populate('author').populate('CoAuthor');
    return response.render('./article/updateArticle', { data: article });

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

    let article = await Article.findById(request.params.id).populate('author').populate('CoAuthor');


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
        deletePicture("../public/images/article", passImage);
    } else {
        await article.save();
    }

    //send success message
    return response.status(200).send({
        success: true,
        message: 'delete article was succesfull',
    });

});

const favorit = safeCall(async (request, response, next) => {

    const id = request.params.id;

    const article = await Article.findById(id);

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
    if (request.body.data === "0") {
        article.favorit--;
        const updatedUer = await User.findByIdAndUpdate(user._id, { "$pullAll": { "favorites": article._id } }, { new: true }).populate('favorites');
        await article.save();
        request.session.user = updatedUer;
        return response.status(200).send({
            success: true,
            message: 'article favorit',
        });
    }

});

const searchProcess = safeCall(async (request, response) => {

    const searchText = request.params.condition;
    const articles = await Article.find({ $text: { $search: searchText } })
    return response.status(200).send({
        success: true,
        message: 'done',
        data: articles,
    });

});


module.exports = {
    articles,
    addArticlePage,
    addArticleProcess,
    delMyArticle,
    updateArticleProcess,
    updateArticlePage,
    favorit,
    searchProcess
};