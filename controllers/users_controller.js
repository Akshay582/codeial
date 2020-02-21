const User = require('../models/user');

// render the profile page
module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                 return res.render('user_profile', {
                    title: "Profile",
                    user: user
                });
            }
            return res.redirect('/users/sign-in');
        });
    }else{
        return res.redirect('/users/sign-in');
    }
}

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    // check if password and confirm password are the same
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in create in the users controller.');
        return;}

        if(!user){
            User.create(req.body,function(err, user){
                if(err){console.log('error in creating a user.'); return;}
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
}

// create a session for the user
module.exports.createSession = function(req, res){
// steps for authentication
    // find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error, user not found during sign-in.'); return;}

        // handle if the user is found

    if(user){
        // handle password if they don't match
        if(user.password != req.body.password){
            return res.redirect('back');
        }

        // handle session creation
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');

    }else{

        // handle if user not found

        return res.redirect('back');
    }
    });    
}