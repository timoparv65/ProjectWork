var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var employee = require('./modules/employee');
var customer = require('./modules/customer');
var service = require('./modules/service');
var servicechoise = require('./modules/servicechoise');
var company = require('./modules/company');
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
    cookie:{maxAge:2400000} // kuinka kauan cookie on valid => 2400'000 ms = 40min
}));

//Bodyparser json() middleware parses the json object
//from HTTP POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function(req,res,next){
    
    //console.log(req.method);
    //console.log(req.path);
    //console.log(__dirname);
    //console.log(req.body);
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
app.use('/servicechoises',servicechoise);
app.use('/companies',company);


//=====================ROUTERS============================

app.get('/logout',function(req,res){
    console.log('index.js/logout');
    
    req.session.destroy();
    res.redirect('/');
});

// this router checks if employee (with admin or member roles) is logged in or not
app.get('/isLoggedToCompanyPrivatePages',function(req,res){
    console.log('index.js/isLoggedToCompanyPrivatePages');
    
    console.log('req.session.userId: ' + req.session.userId);
    console.log('req.session.adminId: ' + req.session.adminId);
    
    // User is logged in if session contains userId attribute
    if(req.session.userId){
        // palauttaa send:illä json-objektin arrayna. mainModule:ssa loginRequiredToCompanyPrivatePages
        // $resource('/isLoggedToCompanyPrivatePages').query()...query vaatii arrayn
        res.status(200).send([{status:'Ok'}]);
    }
    else{
        res.status(401).send([{status:'Unauthorized'}]);
    }
});


// this router checks if employee (with admin role) is logged in or not
app.get('/isLoggedToCompanyAdminPages',function(req,res){
    console.log('index.js/isLoggedToCompanyAdminPages');
    
    console.log('req.session.adminId: ' + req.session.adminId);
    console.log('req.session.userId: ' + req.session.userId);
    
    // User is logged in if session contains userId attribute
    if(req.session.adminId){
        // palauttaa send:illä json-objektin arrayna. mainModule:ssa loginRequiredToCompanyAdminPages
        // $resource('/isLoggedToCompanyAdminPages').query()...query vaatii arrayn
        res.status(200).send([{status:'Ok'}]);
    }
    else{
        res.status(401).send([{status:'Unauthorized'}]);
    }
});

// 5.6.2016
// this router checks if customer is logged in or not
app.get('/isLoggedToCustomerPrivatePages',function(req,res){
    console.log('index.js/isLoggedToCustomerPrivatePages');
    
    console.log('req.session.customerId: ' + req.session.customerId);
    
    // Customer is logged in if session contains customerId attribute
    if(req.session.customerId){
        console.log('onnistui');
        // palauttaa send:illä json-objektin arrayna. mainModule:ssa loginRequiredToCustomerPrivatePages
        // $resource('/isLoggedToCustomerPrivatePages').query()...query vaatii arrayn
        res.status(200).send([{status:'Ok'}]);
    }
    else{
        console.log('epäonnistui');
        res.status(401).send([{status:'Unauthorized'}]);
    }
});

// this router checks if user has rights to company's private pages. I.e. user must be
// employee with member or admin user role
app.get('/company_private_pages',function(req,res,next){
    console.log('index.js/company_private_pages');
    
    console.log('req.session.adminId: ' + req.session.adminId);
	
    acl.isAllowed(req.session.userId, 'company_private_pages', ['get'],function(err,ok){
		console.log(err);
		if(ok === true){
			//res.send('You are authorized');
            console.log('Ok');
            console.log('req.session.userId: ' + req.session.userId);
            //console.log(req.session.userId);
            res.send(200,[{status:"Ok"}]);
        }else{
			//res.send('Not authorized');
            console.log('Not authorized');
            req.session.userId = null;// session.userId asetettu queries.js/loginEmployee, mutta käyttäjän rooli ei riitä
            console.log('req.session.userId: ' + req.session.userId);
            //console.log(req.session.userId);
            res.send(401,[{status:"Not authorized"}]);
		}
	});	
});


// this router checks if user has rights to company's administration pages. I.e. user must be
// employee with admin user role
app.get('/company_admin_pages',function(req,res,next){
    console.log('index.js/company_admin_pages');
    
    console.log('req.session.userId: ' + req.session.userId);
	
    acl.isAllowed(req.session.adminId, 'company_admin_pages', ['get'],function(err,ok){
		console.log(err);
		if(ok === true){
			//res.send('You are authorized');
            console.log('Ok');
            console.log('req.session.adminId: ' + req.session.adminId);
            //console.log(req.session.adminId);
            res.send(200,[{status:"Ok"}]);
        }else{
			//res.send('Not authorized');
            console.log('Not authorized');
            req.session.adminId = null; // session.adminId asetettu queries.js/loginAdminEmployee, mutta käyttäjän rooli ei riitä
            console.log('req.session.adminId: ' + req.session.adminId);
            //console.log(req.session.adminId);
            res.send(401,[{status:"Not authorized"}]);
		}
	});	
});

// lisätty 3.3.2016
app.get('/reset_session_admin_id',function(req,res,next){
    console.log('index.js/reset_session_admin_id');
    
    console.log('req.session.userId: ' + req.session.userId);

    console.log('1) req.session.adminId ' + req.session.adminId);
    req.session.adminId = null;
    console.log('2) req.session.adminId ' + req.session.adminId);
    res.send(200,[{status:"Ok"}]);
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