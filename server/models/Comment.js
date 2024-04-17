const { Schema, model } = require('mongoose');
const {formatDate} = require('../utils/formatDate');
const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    created_At: {
        type: Date,
        default: Date.now,
        get: (timestamp) => formatDate(timestamp)
        
    }, 
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post_Id: {
        // TODO: refactor to the post ID string? 
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;