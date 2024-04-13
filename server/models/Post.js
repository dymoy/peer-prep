const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    topics: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    author: {
        // Reference the user name, NOT the ID
        type: String,
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
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

const Post = model('Post', postSchema);

module.exports = Post;
