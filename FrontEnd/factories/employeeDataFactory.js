main_module.factory('employeeDataFactory',function($resource){
    
    factoryEmployeeData = {};
    
    console.log('employeeDataFactory loaded');
    
    factoryEmployeeData.selected_id = null;
    factoryEmployeeData.selected_service_id = null;
    factoryEmployeeData.selected_service_choise_id = null;
    
    factoryEmployeeData.employeeArray = [];
    factoryEmployeeData.serviceArray = [];
    factoryEmployeeData.serviceChoiseArray = [];
    factoryEmployeeData.selectedEmployee = null;
    factoryEmployeeData.selectedService = null;
    factoryEmployeeData.selectedServiceChoise = null;
    
    
    factoryEmployeeData.getEmployees = function(callbackFunc){
        
        console.log('employeeDataFactory/getEmployees');
        //console.log('factoryEmployeeData.employeeArray.length: ' + factoryEmployeeData.employeeArray.length);
        //console.log('factoryEmployeeData.selected_id: ' + factoryEmployeeData.selected_id);
        //console.log('factoryEmployeeData.employeeArray:');
        //console.log(factoryEmployeeData.employeeArray);
        //console.log('factoryEmployeeData.selectedEmployee:');
        //console.log(factoryEmployeeData.selectedEmployee);
        
        //if(factoryEmployeeData.employeeArray.length === 0){
            
            var resource = $resource('/employees',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){

                console.log('employeeDataFactory/getEmployees:success');
                //console.log(data);

                factoryEmployeeData.employeeArray = data;
                callbackFunc(factoryEmployeeData.employeeArray);    
                
            },function(error){
                
                console.log('employeeDataFactory/getEmployees:fail');
                console.log(error.message);
                
                factoryEmployeeData.employeeArray = [];
                callbackFunc(factoryEmployeeData.employeeArray);
            });
        /*}else{
            
            console.log("employeeDataFactory/getEmployees: employeeArray.length != 0");
            callbackFunc(factoryEmployeeData.employeeArray);
        }*/
    }
    
    factoryEmployeeData.getEmployeesByService = function(data, callBackFunc){
        console.log('employeeDataFactory/getEmployeesByService');
        
        console.log('data');
        console.log(data);
        
        //Create a resource for context '/employees/service'
        var resource = $resource('/employees/service',{id:data.id},{'get':{method:'GET'}});
        
        resource.query().$promise.then(function(returnData){

            console.log('employeeDataFactory/getEmployeesByService:success');
            console.log(returnData);

            factoryEmployeeData.employeeArray = returnData;
            callBackFunc(factoryEmployeeData.employeeArray);
        },function(error){

            console.log('employeeDataFactory/getEmployeesByService:fail');
            console.log(error.message);

            factoryEmployeeData.employeeArray = [];
            callBackFunc(factoryEmployeeData.employeeArray);
        });
        
    }
    
    /**
      *This function searches an employee from array containing an id
      *that was stored when user cliked the row in the partial_employeeDataView
      *page. When it finds the correct one from the array, it returns
      *that object.
      */
    factoryEmployeeData.getSelectedEmployee = function(){
        
        console.log('employeeDataFactory/getSelectedEmployee');
        //console.log('factoryEmployeeData.employeeArray.length: ' + factoryEmployeeData.employeeArray.length);
        //console.log('factoryEmployeeData.selected_id: ' + factoryEmployeeData.selected_id);
        
        for (var i = 0; i < factoryEmployeeData.employeeArray.length; i++){
            if (factoryEmployeeData.employeeArray[i]._id === factoryEmployeeData.selected_id){
                //console.log(factoryEmployeeData.employeeArray[i]);
                factoryEmployeeData.selectedEmployee = factoryEmployeeData.employeeArray[i];
                return factoryEmployeeData.employeeArray[i];
            }
        }
    }
    
    factoryEmployeeData.getEmployeeByEmail = function(data, callBackFunc){
        
        console.log('employeeDataFactory/getEmployeeByEmail');
        
        console.log('data');
        console.log(data);
        
        //Create a resource for context '/employees/singleByEmail'
        var resource = $resource('/employees/singleByEmail',{email:data.email},{'get':{method:'GET'}});
        
        resource.query().$promise.then(function(returnData){

            console.log('employeeDataFactory/getEmployeeByEmail:success');
            console.log(returnData);

            factoryEmployeeData.employeeArray = returnData;
            callBackFunc(factoryEmployeeData.employeeArray);
        },function(error){

            console.log('employeeDataFactory/getEmployeeByEmail:fail');
            console.log(error.message);

            factoryEmployeeData.employeeArray = [];
            callBackFunc(factoryEmployeeData.employeeArray);
        });
    }
    
    factoryEmployeeData.insertData = function(data){
        
        console.log('employeeDataFactory/insertData');
        //console.log(data);
        
        // luo resurssi objekti
        var resource = $resource('/employees',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factoryEmployeeData.updateData = function(data){
        
        console.log('employeeDataFactory/updateData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/employees',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factoryEmployeeData.deleteData = function(data){
        
        console.log('employeeDataFactory/deleteData');
        //console.log(data);
        
        // luo resurssi objekti
        var resource = $resource('/employees',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise:n
        return resource.delete(data).$promise;
    }
    
    
    factoryEmployeeData.insertServiceData = function(data){
        
        console.log('employeeDataFactory/insertServiceData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/services',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factoryEmployeeData.updateServiceData = function(data){
        
        console.log('employeeDataFactory/updateServiceData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/services',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factoryEmployeeData.deleteServiceData = function(data){
        
        console.log('employeeDataFactory/deleteServiceData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/services',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise
        return resource.delete(data).$promise;
    }
    
    
    factoryEmployeeData.getServices = function(callbackFunc){
        
        console.log('employeeDataFactory/getServices');
        console.log('factoryEmployeeData.selectedEmployee');
        console.log(factoryEmployeeData.selectedEmployee);
        //console.log('factoryEmployeeData.serviceArray.length: ' + factoryEmployeeData.serviceArray.length);
        //console.log('factoryEmployeeData.selectedEmployee.name: ' + factoryEmployeeData.selectedEmployee.name);
           
        var resource = $resource('/services',{name:factoryEmployeeData.selectedEmployee.name},{'get':{method:'GET'}});

        resource.query().$promise.then(function(data){

            console.log('employeeDataFactory/getServices:success');
            console.log(data);

            factoryEmployeeData.serviceArray = data;
            callbackFunc(factoryEmployeeData.serviceArray);
        },function(error){

            console.log('employeeDataFactory/getServices:fail');
            console.log(error.message);

            factoryEmployeeData.serviceArray = [];
            callbackFunc(factoryEmployeeData.serviceArray);
        });
        
    }
    
    factoryEmployeeData.getSelectedService = function(){
        
        console.log('employeeDataFactory/getSelectedService');
        //console.log('factoryEmployeeData.serviceArray.length: ' + factoryEmployeeData.serviceArray.length);
        //console.log('factoryEmployeeData.selected_service_id: ' + factoryEmployeeData.selected_service_id);
        
        for (var i = 0; i < factoryEmployeeData.serviceArray.length; i++){
            if (factoryEmployeeData.serviceArray[i]._id === factoryEmployeeData.selected_service_id){
                factoryEmployeeData.selectedService = factoryEmployeeData.serviceArray[i];
                return factoryEmployeeData.serviceArray[i];
            }
        }
    }
    
    
        
    factoryEmployeeData.insertServiceChoiseData = function(data){
        
        console.log('employeeDataFactory/insertServiceChoiseData');
       // console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/servicechoises',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factoryEmployeeData.updateServiceChoiseData = function(data){
        
        console.log('employeeDataFactory/updateServiceChoiseData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/servicechoises',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factoryEmployeeData.deleteServiceChoiseData = function(data){
        
        console.log('employeeDataFactory/deleteServiceChoiseData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/servicechoises',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise
        return resource.delete(data).$promise;
    }
    
    
    factoryEmployeeData.getServiceChoises = function(callbackFunc){
        
        console.log('employeeDataFactory/getServiceChoises');
        //console.log('factoryEmployeeData.serviceChoiseArray.length: ' + factoryEmployeeData.serviceChoiseArray.length);
        
        //if(factoryEmployeeData.serviceChoiseArray.length === 0){
            
            var resource = $resource('/servicechoises',{},{'get':{method:'GET'}});
            
            resource.query().$promise.then(function(data){
                
                console.log('employeeDataFactory/getServiceChoises:success');
                //console.log(data);
                
                factoryEmployeeData.serviceChoiseArray = data;
                callbackFunc(factoryEmployeeData.serviceChoiseArray);
            },function(error){
                
                console.log('employeeDataFactory/getServiceChoises:fail');
                console.log(error.message);
                
                factoryEmployeeData.serviceChoiseArray = [];
                callbackFunc(factoryEmployeeData.serviceChoiseArray);
            });
        /*}else{
            console.log('employeeDataFactory/getServiceChoises:success, factory.serviceChoiseArray.length != 0');
            callbackFunc(factoryEmployeeData.serviceChoiseArray);
        }*/
        
    }
    
    
    return factoryEmployeeData;
    
});