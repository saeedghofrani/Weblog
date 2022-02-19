const mongoose = require('mongoose');
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
    coment: {
        type: [[String, mongoose.SchemaTypes.ObjectId]]
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
module.exports = mongoose.model('Article', articleSchema);