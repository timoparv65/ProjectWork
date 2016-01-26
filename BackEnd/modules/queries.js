/**
 *This file gives query services
 *Version:0.0.2
 *Author:Timo Parviainen
 *Description:Cteated this new file
 */

var db = require('./database');

/**
 *
 */
exports.getReservationsByCustomerName = function(req,res){
    console.log('queries/getReservationsByCustomerName');
    
    db.Customer.findOne({username:req.body.username}).
        populate('assignments').exec(function(err,data){
        
        if(data){
            res.send(data.assignments);
        }else{
            res.redirect('/');
        }
    });
    
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
    
    db.Employee.findOne({name:req.body.name}).
        populate('assignments').exec(function(err,data){
        
        if(data){
            res.send(data.assignments);
        }else{
            res.redirect('/');
        }
    });
    
}

/**
 *
 */
exports.getServicesByEmployeeName = function(req,res){
    console.log('queries/getServicesByEmployeeName');
    console.log(req.query);
    
    db.Employee.findOne({name:req.query.name}).
        populate('services').exec(function(err,data){
        
        console.log(data);
        console.log(data.services);
        
        if(data){
            res.send(data.services);
        }else{
            res.redirect('/');
        }
    });
    
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
    console.log('req.body: ' + req.body);
    
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
 * This function updates employee information to our
 * employee collection
 */
exports.updateEmployee = function(req,res){
    console.log('queries/updateEmployee');
    
    console.log(req.body);
    
    var updateData = {
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    }
    
    console.log(updateData);
    
    db.Employee.update({_id:req.body.id},updateData,function(err){
        
        if(err){
            
            res.status(500).json({message:err.message});
        }else{
            
            res.status(200).json({message:"Data updated"});
        }
    });

}

/**
 * This function deletes employee information from our
 * employee collection
 */
exports.deleteEmployee = function(req,res){
    console.log('queries/deleteEmployee');
    
    var toDelete = [];
    
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
    
    console.log('ei valmis');
    res.status(200).send({message:'Poistoa ei vielä toteutettu'});
}

/**
 * This function saves new service information to our
 * service collection
 */
exports.saveNewService = function(req,res){
    
    console.log('queries/saveNewService');
    console.log(req.body);
    
    var temp = {
        category: req.body.category,
        description: req.body.description,
        timeInMinutes: req.body.timeInMinutes,
        code:req.body.code
    };
    
    console.log(temp);
    console.log(req.body.name);
    
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

/**
 * This function updates service information to our
 * service collection
 */
exports.updateService = function(req,res){
    
    console.log('queries/updateService');
    console.log('req.body: ' + req.body);
    
    var updateData = {
        category:req.body.category,
        description:req.body.description,
        timeInMinutes:req.body.timeInMinutes,
        code:req.body.code
    }
    
    db.Service.update({_id:req.body.id},updateData,function(err){
        
        if(err){
            
            res.status(500).json({message:err.message});
        }else{
            
            res.status(200).json({message:"Data updated"});
        }
    });
    
}

/**
 * This function delete service information from our
 * service collection
 */
exports.deleteService = function(req,res){
    
    console.log('queries/deleteService');
    console.log(req.body);
    console.log(req.query);
    
    var toDelete = [];
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
    console.log('toDelete: ' + toDelete);
    
    db.Service.remove({_id:{$in:toDelete}},function(err,data){
        
        if(err){
            console.log('err: ' + err);
            res.status(500).send({message:err.message});
        }else{
            
            db.Employee.update({name:req.query.name},{$pull:{'services':{$in:toDelete}}},function(err,data){
                if(err){
                    console.log('err: ' + err);
                    res.status(500).send({message:err.message});
                }else{
                    
                    res.status(200).send({message:'Delete success'});
                }
            });
        }
    });
}
