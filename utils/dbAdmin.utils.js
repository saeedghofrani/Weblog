var User = require('../model/user.model');
var config = require('../config/config');
var admin = config.admin;
const creteAdmin = async (database, info) => {
    console.log(admin);
    // const createddAdmin = await database.create(info);
    // console.log(createddAdmin);
    // if (createddAdmin) {
    //     console.log('admin created ' + `${createddAdmin}`);
    //     return process.exit(1);
    // }
    console.log('create admin failed');
    return process.exit(1);
};
var command = process.argv[2];
creteAdmin(User, admin);


// if (command === "-admin") {
  
// }


// const clearCollection = async () => {
//     const User = require('../model/user.model');
//     const Article = require('../model/article.model');
//     const article = await Article.find({}).deleteMany();
//     const user = await User.find({}).deleteMany();
//     if (article && user) {
//         console.log('database clear');
//         process.exit(1);
//     }
//     else {
//         console.log('somthing went wrong');
//         process.exit(1);
//     }
// };
// if (command === "-clear") {
//     clearCollection();
// }