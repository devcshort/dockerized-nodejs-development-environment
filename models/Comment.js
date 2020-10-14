const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: String
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
