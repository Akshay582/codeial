const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    /*
    *   1. Content
    *   2. User
    *   3. Comments
    */
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the array of ids of all comments in the post schema itself
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{
    timestamps: true
});

const Post = mongoose.model('Posts', postSchema);
module.exports = Post;