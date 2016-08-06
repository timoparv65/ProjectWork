/**
 *This file gives query services
 *Version:0.0.3
 *Author:Timo Parviainen
 *Description: Added updateCompany and deleteCompany
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
    
    var searchObject = {
        name:req.body.username,
        password:req.body.password
    }
    
    console.log("searchObject");
    console.log(searchObject);

    db.Customer.findOne(searchObject,function(err,data){
        
        if(err){
            console.log('error');
            res.send(502,{status:err.message});
            
        }else{
            console.log(data);
            //=< 0 means wrong username or password
            if(data){
                req.session.customerId = data.name;
                console.log('req.session.customerId: ' + req.session.customerId);
                
                res.send(200,{status:"Ok"});
            }
            else{
                res.status(401).send({status:"Väärä käyttäjänimi tai salasana"});
            }
            
        }
    });
}

/**
 *
 */
exports.registerCustomer = function(req,res){
    console.log('queries/registerCustomer');
    
    var customer = new db.Customer(req.body);
    customer.save(function(err){
        
        if(err){
            
            res.status(500).send({status:err.message});
        }
        else{
            res.status(200).send({status:"Ok"});
        }
    });
}

/**
 * lisätty 6.8.2016
 */
exports.getSingleCustomerByName = function(req,res){
    console.log('queries/getSingleCustomerByName');
    
    var searchObject = {
        name:req.query.name,
    }
    
    db.Customer.find(searchObject, function(err,data){ // data:ssa palauttaa kaikki löydetyt työntekijät
        if(err){
            console.log('Virhe haussa');
            //500 = Internal Server Error
            res.status(500).send({status:err.message});
        }
        else{
            console.log('Löydetyt asiakkaat');
            console.log(data);
            //200 = ok
            res.status(200).send(data);
        }
    });
    
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
        name:req.body.username,
        password:req.body.password
    }
    
    console.log("searchObject");
    console.log(searchObject);

    db.Employee.findOne(searchObject,function(err,data){
        
        if(err){
            
            res.send(502,{status:err.message});
            
        }else{
            console.log(data);
            //=< 0 means wrong username or password
            if(data){
                req.session.userId = data.name;
                console.log('req.session.userId: ' + req.session.userId);
                //console.log(req.session.userId);
                
                res.send(200,{status:"Ok"});
            }
            else{
                res.status(401).send({status:"Väärä käyttäjänimi tai salasana"});
            }
            
        }
    });
}

/**
 * lisätty 3.3.2016
 */
exports.loginAdminEmployee = function(req,res){
    console.log('queries/loginAdminEmployee');
    
    var searchObject = {
        name:req.body.username,
        password:req.body.password
    }

    db.Employee.findOne(searchObject,function(err,data){
        
        if(err){
            
            res.send(502,{status:err.message});
        }else{

            console.log(data);
            //=< 0 means wrong username or password
            if(data){
                req.session.adminId = data.name;
                console.log('req.session.adminId: ' + req.session.adminId);
                //console.log(req.session.adminId);
                //req.session.userRole = data.role;
                res.send(200,{status:"Ok"});
            }
            else{
                res.status(401).send({status:"Wrong username or password"});
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
        
        console.log('data');
        console.log(data);
        //console.log(data.services);
        
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
 * 18.5.2016
 */
exports.getEmployeesByService = function(req,res){
    console.log('queries/getEmployeesByService');
    
    var searchObject = {
        services:req.query.id
    }
    
    console.log('searchObject');
    console.log(searchObject);
    
    //db.Employee.find({services:searchObject}, function(err,data){ // data:ssa palauttaa kaikki löydetyt työntekijät
    //db.Employee.find({services:req.query.id}, function(err,data){ // data:ssa palauttaa kaikki löydetyt työntekijät
    db.Employee.find(searchObject, function(err,data){ // data:ssa palauttaa kaikki löydetyt työntekijät
        if(err){
            console.log('Virhe haussa');
            //500 = Internal Server Error
            res.status(500).send({status:err.message});
        }
        else{
            console.log('Löydetyt työntekijat');
            console.log(data);
            //200 = ok
            res.status(200).send(data);
        }
    });
    
}

/**
 * lisätty 29.7.2016
 */
exports.getSingleEmployeeByEmailAddress = function(req,res){
    console.log('queries/getSingleEmployeeByEmailAddress');
    
    var searchObject = {
        email:req.query.email,
    }
    
    // email on unique ominaisuus tietokannassa
    db.Employee.find(searchObject, function(err,data){ // data:ssa palauttaa kaikki löydetyt työntekijät
        if(err){
            console.log('Virhe haussa');
            //500 = Internal Server Error
            res.status(500).send({status:err.message});
        }
        else{
            console.log('Löydetyt työntekijat');
            console.log(data);
            //200 = ok
            res.status(200).send(data);
        }
    });
    
}


/**
 *
 */
exports.getAuthData = function(callback){
    console.log('queries/getAuthData');
    
    db.Employee.find(function(err,data){ // data:ssa palauttaa kaikki löydetyt työntekijät
        callback(data);
    });
}

/**
 * This function saves new employee information to our
 * employee collection
 */
exports.saveNewEmployee = function(req,res){
    console.log('queries/saveNewEmployee');
    //console.log('req.body: ' + req.body);
    
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
    //console.log('queries/updateEmployee');
    
    //console.log(req.body);
    
    var updateData = {
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        role:req.body.role
    }
    
    //console.log(updateData);
    
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
    //console.log('queries/deleteEmployee');
    
    var toDelete = []; // tuhottavien työntekijöiden _id
    
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
    
    //console.log(toDelete[0]);
    
    db.Employee.find({_id:toDelete[0]}).
        populate('services').exec(function(err,data){
        //console.log('DATAA:' + data[0].services);
        if(err){
            //console.log('err: ' + err);
            res.status(500).send({message:err.message});
        }else{
            
            db.Service.remove({_id:{$in:data[0].services}},function(err,data){
               if(err) {
                   //console.log('err: ' + err);
                   res.status(500).send({message:err.message});
               }else{
                   //console.log('Employee services removed');
                   //console.log(data);
                   //res.status(200).send({message:'Delete success'});
                   
                   db.Employee.remove({_id:toDelete[0]},function(err,data){
                        if(err){
                                //console.log('err: ' + err);
                                res.status(500).send({message:err.message});
                        }else{
                                //console.log('Employee removed');
                                res.status(200).send({message:'Delete success'});
                        }
                    });
               }
            });
            
        }
    
    });
    
    
}

/**
 * This function deletes employee information from our
 * employee collection
 => lisätty 25.7.2016
 */
exports.deleteEmployee2 = function(req,res){
    console.log('queries/deleteEmployee2');
    
    var toDelete = []; // tuhottavien työntekijöiden _id
    
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
    
    //console.log(toDelete[0]);
    
   db.Employee.remove({_id:toDelete[0]},function(err,data){
        if(err){
            //console.log('err: ' + err);
            res.status(500).send({message:err.message});
        }else{
            //console.log('Employee removed');
            res.status(200).send({message:'Delete success'});
        }
    });

}

/**
 * This function saves new service information to our
 * service collection
 */
exports.saveNewService = function(req,res){
    
    console.log('queries/saveNewService');
    console.log(req.body);
    
    var temp = {
        id: req.body.id,
        category: req.body.category,
        categoryextrainfo: req.body.categoryextrainfo,
        description: req.body.description,
        extrainfo: req.body.extrainfo,
        duration: req.body.duration,
        price:req.body.price
    };
    
    console.log(temp);
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

/**
 * This function saves service information to our
 * emplyee collection's services field
 * => lisätty 25.7.2016
 */
exports.saveNewService2 = function(req,res){
    
    console.log('queries/saveNewService2');
    console.log(req.body);
    
    db.Employee.update({name:req.body.name},
                       {$push:{'services':req.body.id}},
                       function(err,updatedData){
            if (err){
                res.status(500).json({message:'Fail'});
            } else {
                res.status(200).json({data:updatedData});
            }
        }
    );
}

/**
 * This function updates service information to our
 * service collection
 */
exports.updateService = function(req,res){
    
    //console.log('queries/updateService');
    //console.log('req.body: ' + req.body);
    
    var updateData = {
        //category:req.body.category,
        //description:req.body.description,
        //duration:req.body.duration,
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
    
    //console.log('queries/deleteService');
    //console.log(req.body);
    //console.log(req.query);
    
    var toDelete = [];
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
    //console.log('toDelete: ' + toDelete);
    
    db.Service.remove({_id:{$in:toDelete}},function(err,data){
        
        if(err){
            //console.log('err: ' + err);
            res.status(500).send({message:err.message});
        }else{
            
            db.Employee.update({name:req.query.name},{$pull:{'services':{$in:toDelete}}},function(err,data){
                if(err){
                    //console.log('err: ' + err);
                    res.status(500).send({message:err.message});
                }else{
                    
                    res.status(200).send({message:'Delete success'});
                }
            });
        }
    });
}

// lisätty 25.7.2016
exports.deleteService2 = function(req,res){
    
    console.log('queries/deleteService2');
    
    var toDelete = [];
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
    //console.log('toDelete: ' + toDelete);
    
    db.Employee.update({name:req.query.name},{$pull:{'services':{$in:toDelete}}},function(err,data){
        if(err){
            //console.log('err: ' + err);
            res.status(500).send({message:err.message});
        }else{
            res.status(200).send({message:'Delete success'});
        }
    });
}


/**
 * This function saves new service information to our
 * service collection
 */
exports.saveNewServiceChoise = function(req,res){
    
    console.log('queries/saveNewServiceChoise');
    console.log(req.body);
    
    var temp = {
        category: req.body.category,
        categoryextrainfo: req.body.categoryextrainfo,
        description: req.body.description,
        extrainfo: req.body.extrainfo,
        duration: req.body.duration,
        price: req.body.price
    };
    
    console.log(temp);
    //console.log(req.body.name);
    
    var serviceChoiseTemp = new db.ServiceChoise(temp);
    
    // save it to database
    serviceChoiseTemp.save(function(err,newData){

        if(err){
            
            //500 = Internal Server Error
            res.status(500).json({message:err.message});
        }else{
                
            //200 = ok
            res.status(200).json({data:newData});
        }
    });
    
}

/**
 * This function updates service information to our
 * service collection
 */
exports.updateServiceChoise = function(req,res){
    
    //console.log('queries/updateServiceChoise');
    //console.log('req.body: ' + req.body);
    
    var updateData = {
        category:req.body.category,
        categoryextrainfo:req.body.categoryextrainfo,
        description:req.body.description,
        extrainfo:req.body.extrainfo,
        duration:req.body.duration,
        price:req.body.price
    }
    
    db.ServiceChoise.update({_id:req.body.id},updateData,function(err){
        
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
exports.deleteServiceChoise = function(req,res){
    
    //console.log('queries/deleteServiceChoise');
    //console.log(req.body);
    //console.log(req.query);
    
    var toDelete = [];
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
    //console.log('toDelete: ' + toDelete);
    
    db.ServiceChoise.remove({_id:{$in:toDelete}},function(err,data){
        
        if(err){
            
            //console.log('err: ' + err);
            res.status(500).send({message:err.message});
        }else{
            
            res.status(200).send({message:'Delete success'});
        }
    });
}


/**
 * 
 */
exports.getAllServiceChoises = function(req,res){
    
    //console.log('queries/getAllServiceChoises');
    
    db.ServiceChoise.find(function(err,data){ // data:ssa palauttaa kaikki löydetyt palvaluvaihtoehdot
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
 * 
 */
exports.getCompanyInformation = function(req,res){
    
    console.log('queries/getCompanyInformation');
    
    db.Company.find(function(err,data){ // data:ssa palauttaa kaikki löydetyjen yritysten tiedot. Niitä on vain yksi
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
 * This function saves new company information to our
 * company collection
 */
exports.saveNewCompany = function(req,res){
    
    console.log('queries/saveNewCompany');
    console.log('req.body: ' + req.body);
    
    var companyTemp = new db.Company(req.body);
    
    // save it to database
    companyTemp.save(function(err,newData){
        
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
 * This function updates company information to our
 * company collection
 */
exports.updateCompany = function(req,res){
    
    console.log('queries/updateCompany');
    console.log('req.body: ' + req.body);
    
    var updateData = {
        name:req.body.name,
        address:req.body.address,
        postalCode:req.body.postalCode,
        city:req.body.city,
        country:req.body.country,
        phoneNumber:req.body.phoneNumber,
        openingTime:req.body.openingTime,
        closingTime:req.body.closingTime,
        timeRaster:req.body.timeRaster
    }
    
    console.log(updateData);
    
    db.Company.update({_id:req.body.id},updateData,function(err){
        
        if(err){
            
            res.status(500).json({message:err.message});
        }else{
            
            res.status(200).json({message:"Data updated"});
        }
    });

}

/**
 * This function deletes company information from our
 * company collection
 */
exports.deleteCompany = function(req,res){
    
    console.log('queries/deleteCompany');
    console.log(req.body);
    console.log(req.query);
    
    var toDelete = [];
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
    console.log('toDelete: ' + toDelete);
    
    db.Company.remove({_id:{$in:toDelete}},function(err,data){
        
        if(err){
            
            //console.log('err: ' + err);
            res.status(500).send({message:err.message});
        }else{
            
            res.status(200).send({message:'Delete success'});
        }
    });
}

/**
 * This function saves new reservation information to our
 * reservation collection
 * => 31.7.2016
 */
exports.saveNewReservation = function(req,res){
    console.log('queries/saveNewReservation');
    //console.log('req.body: ' + req.body);
    
    var reservationTemp = new db.Reservation(req.body);
    
    // save it to database
    reservationTemp.save(function(err,newData){
        
        if(err){
            //500 = Internal Server Error
            res.status(500).json({message:'Fail'});
        }else{
            //200 = ok
            res.status(200).json({data:newData});
        }
    });
}
