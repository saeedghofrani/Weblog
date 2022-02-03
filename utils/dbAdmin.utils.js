(async () => {
    try {
        require("../db/connection.db");
        const User = require('../model/user.model');
        const config = require('../config/config');
        console.log(config.admin);
        const createddAdmin = await User.create(config.admin);
        if (createddAdmin) {
            console.log('admin created ' + `${createddAdmin}`);
            return process.exit(1);
        }
        console.log('create admin failed');
        return process.exit(1);
    } catch (error) {
        console.log(`server error:\n ` + `please first check if there is an admin\n` + ` then make sure database is connected\n` + error);
    }

})();