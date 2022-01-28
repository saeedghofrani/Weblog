require('dotenv').config();
const User = require('../model/user.model');
const Article = require('../model/article.model');
console.log(process.env.DEV_APP_PORT);

const creteAdmin = (async () => {
    const admin = {
        firstName: process.env.ADMIN_FIRSTNAME,
        lastName: process.env.ADMIN_LASTNAME,
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
        role: process.env.ADMIN_ROLE,
        phone: process.env.ADMIN_PHONE,
    };
    console.log(admin);
    const createrdAdmin = await User.create(admin);
    if (createrdAdmin) {
        console.log('admin created ' + `${createrdAdmin}`);
        process.exit(1);
    }
    else {
        console.log('create admin failed');
        process.exit(1);
    }
});

const clearCollection = (async () => {
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
});

// const command = process.argv[2];

// if (command === "-admin") {
//     creteAdmin();
// }

// if (command === "-clear") {
//     clearCollection();
// }