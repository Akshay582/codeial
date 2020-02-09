const express = require('express');
const app = express();
const port = 8000;

// for any further files we will use the router
app.use('/', require('./routes'));

// set up of the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Port: ${port}`);
});