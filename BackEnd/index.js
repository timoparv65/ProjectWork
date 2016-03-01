var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var employee = require('./modules/employee');
var customer = require('./modules/customer');
var service = require('./modules/service');
var servicechoise = require('./modules/servicechoise');
var acl = require('acl');


// This is used for creating a secret key value for our session cookie
var uuid = require('uuid');
// This is used to create a session object for client
var session = require('express-session');

var app = express();

var conn = require('./modules/database').connect(builAuthorization);


//=====================Middlewares========================

// luo session ja cookien
app.use(session({
    secret:uuid.v1(),
    cookie:{maxAge:600000} // kuinka kauan cookie on valid => 600'000 ms = 10min
}));

//Bodyparser json() middleware parses the json object
//from HTTP POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function(req,res,next){
    
    console.log(req.method);
    console.log(req.path);
    console.log(__dirname);
    console.log(req.body);
    //console.log(req.session);
    //Send request forward in stack
    next();
});

// Define middlewares for our static files (.html, .css, .js files that are loaded
// by browser when parsing index.html file)
app.use('/',express.static(path.join(__dirname, '../FrontEnd/views'))); // hakee oletusarvoisesti index.html:än
app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css')));
app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../FrontEnd/lib')));
app.use('/FrontEnd/module',express.static(path.join(__dirname, '../FrontEnd/module')));
app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../FrontEnd/controllers')));
app.use('/FrontEnd/factories',express.static(path.join(__dirname, '../FrontEnd/factories')));
app.use('/FrontEnd/directives',express.static(path.join(__dirname, '../FrontEnd/directives')));


//=====================OUR REST API MIDDLEWARES============================
app.use('/employees',employee);
app.use('/customers',customer);
app.use('/services',service);
app.use('/servicechoises',servicechoise)

//=====================ROUTERS============================

app.get('/logout',function(req,res){
    
    req.session.destroy();
    res.redirect('/');
});

app.get('/company_private_pages',function(req,res,next){
    console.log('index.js/company_private_pages');
    console.log('req.session.userId');
    console.log(req.session.userId);
	acl.isAllowed(req.session.userId, 'company_private_pages', ['get'],function(err,ok){
		console.log(err);
		if(ok === true){
			//res.send('You are authorized');
            console.log('Ok');
            res.send(200,[{status:"Ok"}]);
        }else{
			//res.send('Not authorized');
            console.log('Not authorized');
            res.send(401,[{status:"Not authorized"}]);
		}
	});	
});


app.get('/company_admin_pages',function(req,res,next){
    console.log('index.js/company_admin_pages');
    console.log('req.session.userId');
    console.log(req.session.userId);
	acl.isAllowed(req.session.userId, 'company_admin_pages', ['get'],function(err,ok){
		console.log(err);
		if(ok === true){
			//res.send('You are authorized');
            console.log('Ok');
            res.send(200,[{status:"Ok"}]);
        }else{
			//res.send('Not authorized');
            console.log('Not authorized');
            res.send(401,[{status:"Not authorized"}]);
		}
	});	
});

app.listen(3000);


//=============== Callback functions =====================

function builAuthorization(dbconn){
	acl = new acl(new acl.mongodbBackend(dbconn.connection.db, "acl_"));
	acl.allow([
    {
        roles:['admin'],
        allows:[
			{resources:['company_private_pages','company_admin_pages'],permissions:['get','post','put','delete']}
        ]
    },
    {
        roles:['member'],
        allows:[
            {resources:['company_private_pages'], permissions:['get','put','delete']}
        ]
    },
	],function(){

		console.log('ROLES ADDED');
        queries.getAuthData(function(data){
            console.log(data);  
            for(i=0; i< data.length; i++){
                console.log(data[i].name);
                acl.addUserRoles(data[i].name, data[i].role);
            }

        });
		
	});
	
}