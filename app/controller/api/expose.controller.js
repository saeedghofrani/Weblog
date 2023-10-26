const sendEmail = require('../../utils/email.utils');
const Article = require('../../model/article.model');
const safeCall = require('../../utils/safeCall.utils');

class ExposeController {

    home = safeCall(async (_request, response, _next) => {
        const articles = await Article.find().sort({ visitCount: -1 }).limit(4).populate('author');
        return response.render('home', { data: articles });
    });


    contact = (_request, response, _next) => {
        response.render('contact');
    };

    about = (_request, response, _next) => {
        response.render('about');
    };

    contactProcces = async (request, response, next) => {
        const {
            from,
            subject,
            text
        } = request.body;
        console.log(from, subject, text);
        await sendEmail(from, subject, text);
        response.render('contact');
    }
}

module.exports = new ExposeController()
