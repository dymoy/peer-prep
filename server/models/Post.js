const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    topics: {
        type: String
    },
    author: {
        // TODO: Reference the user name, NOT the ID
        type: String,
        ref: 'User'
    },
    created_at: { 
        type: Date,
        default: Date.now,
        get: (created_At) => formatDate(created_At),
    }, 
    solved: { 
        type: Boolean,
        default: false
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

const Post = model('Post', postSchema);

module.exports = Post;
