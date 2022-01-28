const session = {
    login: (req, res, next) => {
        if (!req.session.user || !req.cookies.user_sid)
            return res.redirect('/auth/login');
        next();
    },
    dashboard: (req, res, next) => {
        if (req.session.user && req.cookies.user_sid)
            return res.redirect('/dashboard');
        next();
    }
};
module.exports = session;