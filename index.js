// Backend tiedosto

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

//============================ Middlewares=============================

// Bodyparser json() middleware parses the json object from HTTP POST request
app.use(bodyParser.urlencoded());

app.use(function(req,res,next){
    console.log(req.method);
    console.log(req.path);
    console.log(__dirname);
    console.log(req.body);
    next(); //Send request forward in stack
})


app.use('/',express.static(path.join(__dirname, 'views')));
app.use('/css',express.static(path.join(__dirname, 'css')));
app.use('/controllers',express.static(path.join(__dirname, 'controllers')));
app.use('/lib',express.static(path.join(__dirname, 'lib')));


//============================ Routers ================================

app.listen(3000);
