const User = require('../model/user.model');
const config = require('../config/config');
console.log(config);
const admin = config.admin;
console.log(admin);
const creteAdmin = async (User, admin) => {
    const createddAdmin = await User.create(admin);
    console.log(createddAdmin);
    if (createddAdmin) {
        console.log('admin created ' + `${createddAdmin}`);
        return process.exit(1);
    }
    console.log('create admin failed');
    return process.exit(1);
};

const clearCollection = async () => {
    const User = require('../model/user.model');
    const Article = require('../model/article.model');
    const article = await Article.find({}).deleteMany();
    const user = await User.find({}).deleteMany();
    if (article && user) {
        console.log('database clear');
        process.exit(1);
    }
    else {
        console.log('somthing went wrong');
        process.exit(1);
    }
};

const command = process.argv[2];

if (command === "-admin") {
    creteAdmin(User, admin);
}

if (command === "-clear") {
    clearCollection();
}