const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        // TODO: get
    }, 
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;