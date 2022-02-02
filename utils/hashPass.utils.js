const bcrypt = require('bcryptjs');
const hashPass = (this, user, ne) => {
    if (this.isNew || this.isModified('password')) {
        const salt = bcrypt.genSalt(10);
        salt.then(salt => { return bcrypt.hash(user.password, salt); })
            .then(hash => { user.password = hash; return next(); })
            .catch(err => next(err));
    }
};
module.exports = hashPass;