/**
 *This file gives query services
 *Version:0.0.1
 *Author:Timo Parviainen
 *Description:Cteated this new file
 */

var db = require('./database');

/**
 *
 */
exports.getReservationsByCustomerName = function(req,res){
    console.log('queries/getReservationsByCustomerName')
}

/**
 *
 */
exports.loginCustomer = function(req,res){
    console.log('queries/loginCustomer');
}

/**
 *
 */
exports.registerCustomer = function(req,res){
    console.log('queries/registerCustomer');
}

/**
 *
 */
exports.registerEmployee = function(req,res){
    console.log('queries/registerEmployee');
    
    var employee = new db.Employee(req.body);
    employee.save(function(err){
        
        if(err){
            
            res.status(500).send({status:err.message});
        }
        else{
            res.status(200).send({status:"Ok"});
        }
    });
}

/**
 *
 */
exports.loginEmployee = function(req,res){
    
    console.log('queries/loginEmployee');
    
    var searchObject = {
        username:req.body.username,
        password:req.body.password
    }

    db.Employee.findOne(searchObject,function(err,data){
        
        if(err){
            
            res.send(502,{status:err.message});
            
        }else{
            //console.log(data);
            //=< 0 means wrong username or password
            if(data){
                req.session.kayttaja = data.username;
                res.send(200,{status:"Ok"});
            }
            else{
                res.send(401,{status:"Wrong username or password"});
            }
            
        }
    });
}

/**
 *
 */
exports.getReservationsByEmployeeName = function(req,res){
    console.log('queries/getReservationsByEmployeeName');
}

/**
 *
 */
exports.getAllEmployees = function(req,res){
    console.log('queries/getAllEmployees');
    
    db.Employee.find(function(err,data){ // data:ssa palauttaa kaikki löydetyt työntekijät
        if(err){
            //console.log(err.message);
            //500 = Internal Server Error
            res.status(500).send({status:err.message});
        }
        else{
            //console.log(data);
            //200 = ok
            res.status(200).send(data);
        }
    });
}

/**
 * This function saves new employee information to our
 * employee collection
 */
exports.saveNewEmployee = function(req,res){
    console.log('queries/saveNewEmployee');
    //console.log(req.body);
    
    var employeeTemp = new db.Employee(req.body);
    
    // save it to database
    employeeTemp.save(function(err,newData){
        
        if(err){
            //500 = Internal Server Error
            res.status(500).json({message:'Fail'});
        }else{
            //200 = ok
            res.status(200).json({data:newData});
        }
    });
}

/**
 * This function saves new service information to our
 * service collection
 */
exports.saveNewService = function(req,res){
    
    console.log('queries/saveNewService');
    //console.log(req.body);
    
    var temp = {
        category: req.body.category,
        description: req.body.description,
        timeInMinutes: req.body.timeInMinutes,
        code:req.body.code
    };
    
    //console.log(temp);
    //console.log(req.body.name);
    
    //var serviceTemp = new db.Service(req.body);
    var serviceTemp = new db.Service(temp);
    
    // save it to database
    serviceTemp.save(function(err,newData){

        db.Employee.update({name:req.body.name},
                          {$push:{'services':serviceTemp._id}},
                          function(err,model){
            
            if(err){
                //500 = Internal Server Error
                res.status(500).json({message:'Fail'});
                }else{
                //200 = ok
                res.status(200).json({data:newData});
                }
            
        });
    });
    
}
