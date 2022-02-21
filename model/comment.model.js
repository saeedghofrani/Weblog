const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Article',
        required: true,
    },
    parentCommentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
}, { timestamps: true });
module.exports = mongoose.model('Comment', CommentSchema);