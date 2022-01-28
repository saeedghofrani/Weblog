const accessController = (roles) => {
    return function (req, res, next) {
        if (!roles.includes(req.session.user.role)) {
            res.render('error', { 
                error: { 
                    message: "page has gone missing", 
                    status: 403 
                } 
            });
        }
        next();
    };
};
module.exports = accessController;