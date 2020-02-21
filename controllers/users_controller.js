const User = require('../models/user');

// render the profile page
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: "Profile"
    });
}

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.user){
        // if the user is signed in
        return res.redirect('/users/profile');
    }
    // if the user is not signed in
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.user){
        // if the user is signed in
        return res.redirect('/users/profile');
    }
    // if the user is not signed in
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
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    
    req.logout();
    
    return res.redirect('/')
}