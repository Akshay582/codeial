const express = require('express');
const app = express();
const port = 8000;

// for any further files we will use the router
app.use('/', require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Port: ${port}`);
});