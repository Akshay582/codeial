const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie and passport authentication
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
// const passportJWT = require('./config/passport-jwt-stratergy');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up of the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial', 
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: new MongoStore(
        {
            mongooseConnection: mongoose.connection,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup: ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// for any further files we will use the router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Port: ${port}`);
});