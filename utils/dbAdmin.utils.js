(async () => {
    const User = require('../model/user.model');
    const config = require('../config/config');
    const admin = config.admin;
    const createddAdmin = await User.create(admin, {upsert: true});
    if (createddAdmin) {
        console.log('admin created ' + `${createddAdmin}`);
        return process.exit(1);
    }
    console.log('create admin failed');
    return process.exit(1);
})();