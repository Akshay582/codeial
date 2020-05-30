const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.posts = function(req, res){
    Post.create({
        content: req.body.content, 
        user: req.user._id
    },
        function(err, post){
        if(err){console.log('error in creating a new post for the user.'); return;}
        return res.redirect('back');
    });
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        // .id means converting the object into string
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post: req.params.id}, function(err){
            });
        }
        return res.redirect('back');
    })
}