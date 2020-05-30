const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res) {
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.json(200, {
        message: "list of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req, res){

    try { 
        let post = await Post.findById(req.params.id);
    
        // .id means converting the object into string
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});

            return res.json(200, {
                message: "Posts and associated comments deleted successfully."
            });

            // if(req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post Deleted"
            //     });
            // }
            // req.flash('success', 'Post and associated comments deleted');
            // return res.redirect('back');
        }else{
            return res.json(401, {
                message: "You cannot delete this post."
            })
        //     req.flash('error', 'You cannot delete this post.');
        //     return res.redirect('back');
        }
    }catch(err){
        return res.json(500,{
            message: "Internal server error."
        });
    }
}