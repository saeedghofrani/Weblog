const mongoose = require('mongoose');
const Comment = require('./comment.model');
const deletePicture = require('../utils/deletePicture.utils');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "https://www.kindpng.com/picc/m/79-792364_write-icon-symbol-design-sign-on-message-graphic.png"
    },
    visitCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    favorit: {
        type: Number,
        default: 0
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    CoAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
}, { timestamps: true });

articleSchema.index({ title: 'text', description: 'text' });

articleSchema.pre(/^delete/ || 'findByIdAndDelete', async function(next) {

    await Comment.deleteMany({ 'postId': this._conditions._id });
    deletePicture("../public/images/article", this._conditions.image);
    next();
})

module.exports = mongoose.model('Article', articleSchema);