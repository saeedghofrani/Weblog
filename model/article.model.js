// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const articleSchema = new Schema({
//     postedBy: {
//         type: Schema.Types.ObjectId,
//         ref: 'Blogger',
//         required: true
//     },
//     title: essential,
//     image: {
//         default: 'default.jpg'
//     },
//     description: essential,
//     content: essential,
//     htmlContent: essential,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });
module.exports = mongoose.model('Article', articleSchema);