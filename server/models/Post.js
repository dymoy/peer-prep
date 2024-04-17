const { Schema, model } = require('mongoose');
const {dateFormat} = require('../utils/formatDate');

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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: { 
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp) 
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
