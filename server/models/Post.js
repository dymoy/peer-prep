const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    topic: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: { 
        type: Date,
        default: Date.now
        // TODO: get: (timestamp) => dateFormat(timestamp),
    }, 
    solved: { 
        type: Boolean,
        default: false
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
});

const Post = model('Post', postSchema);

module.exports = Post;
