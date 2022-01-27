const accessController = (roles) => {
    return function (req, res, next) {
        if (!roles.includes(req.session.user.role)) {
            return res.status(403).send('Access denied!');
        }
        next();
    };
};
module.exports = accessController;