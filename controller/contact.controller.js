const sendEmail = require('../utils/email.utils')
const contact = (_request, response, _next) => {
    response.render('contact');
};
const contactProcces = async (request, response, next) => {
    // const {
    //     from,
    //     subject,
    //     text
    // } = request.body;

    // await sendEmail(from, subject, text);

}
module.exports = {
    contact,
    contactProcces
};