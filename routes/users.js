const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

/*
    1.user view
    2.user update
    3.sign-up view
    4.sign-in view
    5.logout
    6.user create
    7.user view
*/
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

// to sign out or log out
router.get('/sign-out', usersController.destroySession);

router.post('/create', usersController.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
    ), usersController.createSession);

module.exports = router;