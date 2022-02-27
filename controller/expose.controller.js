const sendEmail = require('../utils/email.utils')

const home = (_request, response, _next) => {
    return response.render('home');
};


const contact = (_request, response, _next) => {
    response.render('contact');
};

const about = (_request, response, _next) => {
    response.render('about');
};

const contactProcces = async (request, response, next) => {
    const {
        from,
        subject,
        text
    } = request.body;

    await sendEmail(from, subject, text);

}

module.exports = {
    contact,
    contactProcces,
    about,
    home
};
