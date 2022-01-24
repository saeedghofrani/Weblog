const bcrypt = require("bcryptjs");
const password = "mypass123";
const saltRounds = 10;
bcrypt.genSalt(saltRounds, function (saltError, salt) {
    if (saltError) {
        throw saltError;
    } else {
        bcrypt.hash(password, salt, function (hashError, hash) {
            if (hashError) {
                throw hashError;
            } else {
                console.log(hash);
            }
        });
    }
});