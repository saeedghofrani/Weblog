const logout = (req, res, _next) => {
    res.clearCookie('user_sid');
    req.session.destroy();
    return res.redirect('/login');
};
module.exports = logout;