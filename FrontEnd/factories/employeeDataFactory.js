main_module.factory('employeeDataFactory',function($resource){
    
    factory = {};
    
    console.log('employeeDataFactory loaded');
    
    factory.selected_id = null;
    factory.selected_service_id = null;
    factory.selected_service_choise_id = null;
    
    factory.employeeArray = [];
    factory.serviceArray = [];
    factory.serviceChoiseArray = [];
    factory.selectedEmployee = null;
    factory.selectedService = null;
    factory.selectedServiceChoise = null;
    
    
    factory.getEmployees = function(callbackFunc){
        
        console.log('employeeDataFactory/getEmployees');
        //console.log('factory.employeeArray.length: ' + factory.employeeArray.length);
        //console.log('factory.selected_id: ' + factory.selected_id);
        //console.log('factory.employeeArray:');
        //console.log(factory.employeeArray);
        //console.log('factory.selectedEmployee:');
        //console.log(factory.selectedEmployee);
        
        //if(factory.employeeArray.length === 0){
            
            var resource = $resource('/employees',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){

                console.log('employeeDataFactory/getEmployees:success');
                //console.log(data);

                factory.employeeArray = data;
                callbackFunc(factory.employeeArray);    
                
            },function(error){
                
                console.log('employeeDataFactory/getEmployees:fail');
                console.log(error.message);
                
                factory.employeeArray = [];
                callbackFunc(factory.employeeArray);
            });
        /*}else{
            
            console.log("companyDataFactory/getCompanyInformation: employeeArray.length != 0");
            callbackFunc(factory.employeeArray);
        }*/
    }
    
    factory.getEmployeesByService = function(data, callBackFunc){
        console.log('employeeDataFactory/getEmployeesByService');
        
        //Create a resource for context '/employees/service'
        var resource = $resource('/employees/service',{},{'post':{method:'POST'}});
        
        resource.post(data).$promise.then(function(returnData){

            console.log('employeeDataFactory/getEmployeesByService:success');
            console.log(returnData);

            factory.employeeArray = returnData;
            callbackFunc(factory.employeeArray);
        },function(error){

            console.log('employeeDataFactory/getEmployeesByService:fail');
            console.log(error.message);

            factory.employeeArray = [];
            callbackFunc(factory.employeeArray);
        });
    }
    
    factory.getEmployeesByServiceAndEmployeeInfo = function(data, callBackFunc){
        console.log('employeeDataFactory/getEmployeesByServiceAndEmployeeInfo');
        
        var temp = data;
        callBackFunc(temp);
    }
    
    /**
      *This function searches an employee from array containing an id
      *that was stored when user cliked the row in the partial_employeeDataView
      *page. When it finds the correct one from the array, it returns
      *that object.
      */
    factory.getSelectedEmployee = function(){
        
        console.log('employeeDataFactory/getSelectedEmployee');
        //console.log('factory.employeeArray.length: ' + factory.employeeArray.length);
        //console.log('factory.selected_id: ' + factory.selected_id);
        
        for (var i = 0; i < factory.employeeArray.length; i++){
            if (factory.employeeArray[i]._id === factory.selected_id){
                //console.log(factory.employeeArray[i]);
                factory.selectedEmployee = factory.employeeArray[i];
                return factory.employeeArray[i];
            }
        }
    }
    
    factory.insertData = function(data){
        
        console.log('employeeDataFactory/insertData');
        //console.log(data);
        
        // luo resurssi objekti
        var resource = $resource('/employees',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factory.updateData = function(data){
        
        console.log('employeeDataFactory/updateData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/employees',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factory.deleteData = function(data){
        
        console.log('employeeDataFactory/deleteData');
        //console.log(data);
        
        // luo resurssi objekti
        var resource = $resource('/employees',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise:n
        return resource.delete(data).$promise;
    }
    
    
    factory.insertServiceData = function(data){
        
        console.log('employeeDataFactory/insertServiceData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/services',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factory.updateServiceData = function(data){
        
        console.log('employeeDataFactory/updateServiceData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/services',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factory.deleteServiceData = function(data){
        
        console.log('employeeDataFactory/deleteServiceData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/services',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise
        return resource.delete(data).$promise;
    }
    
    
    factory.getServices = function(callbackFunc){
        
        console.log('employeeDataFactory/getServices');
        console.log('factory.selectedEmployee');
        console.log(factory.selectedEmployee);
        //console.log('factory.serviceArray.length: ' + factory.serviceArray.length);
        //console.log('factory.selectedEmployee.name: ' + factory.selectedEmployee.name);
           
        var resource = $resource('/services',{name:factory.selectedEmployee.name},{'get':{method:'GET'}});

        resource.query().$promise.then(function(data){

            console.log('employeeDataFactory/getServices:success');
            console.log(data);

            factory.serviceArray = data;
            callbackFunc(factory.serviceArray);
        },function(error){

            console.log('employeeDataFactory/getServices:fail');
            console.log(error.message);

            factory.serviceArray = [];
            callbackFunc(factory.serviceArray);
        });
        
    }
    
    factory.getSelectedService = function(){
        
        console.log('employeeDataFactory/getSelectedService');
        //console.log('factory.serviceArray.length: ' + factory.serviceArray.length);
        //console.log('factory.selected_service_id: ' + factory.selected_service_id);
        
        for (var i = 0; i < factory.serviceArray.length; i++){
            if (factory.serviceArray[i]._id === factory.selected_service_id){
                factory.selectedService = factory.serviceArray[i];
                return factory.serviceArray[i];
            }
        }
    }
    
    
        
    factory.insertServiceChoiseData = function(data){
        
        console.log('employeeDataFactory/insertServiceChoiseData');
       // console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/servicechoises',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factory.updateServiceChoiseData = function(data){
        
        console.log('employeeDataFactory/updateServiceChoiseData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/servicechoises',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factory.deleteServiceChoiseData = function(data){
        
        console.log('employeeDataFactory/deleteServiceChoiseData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/servicechoises',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise
        return resource.delete(data).$promise;
    }
    
    
    factory.getServiceChoises = function(callbackFunc){
        
        console.log('employeeDataFactory/getServiceChoises');
        //console.log('factory.serviceChoiseArray.length: ' + factory.serviceChoiseArray.length);
        
        //if(factory.serviceChoiseArray.length === 0){
            
            var resource = $resource('/servicechoises',{},{'get':{method:'GET'}});
            
            resource.query().$promise.then(function(data){
                
                console.log('employeeDataFactory/getServiceChoises:success');
                //console.log(data);
                
                factory.serviceChoiseArray = data;
                callbackFunc(factory.serviceChoiseArray);
            },function(error){
                
                console.log('employeeDataFactory/getServiceChoises:fail');
                console.log(error.message);
                
                factory.serviceChoiseArray = [];
                callbackFunc(factory.serviceChoiseArray);
            });
        /*}else{
            console.log('employeeDataFactory/getServiceChoises:success, factory.serviceChoiseArray.length != 0');
            callbackFunc(factory.serviceChoiseArray);
        }*/
        
    }
    
    factory.getSelectedServiceChoise = function(){
        
        console.log('employeeDataFactory/getSelectedServiceChoise');
        //console.log('factory.serviceChoiseArray.length: ' + factory.serviceChoiseArray.length);
        //console.log('factory.selected_service_choise_id: ' + factory.selected_service_choise_id);
        
        for (var i = 0; i < factory.serviceChoiseArray.length; i++){
            if (factory.serviceChoiseArray[i]._id === factory.selected_service_choise_id){
                factory.selectedServiceChoise = factory.serviceChoiseArray[i];
                return factory.serviceChoiseArray[i];
            }
        }
    }
    
    
    return factory;
    
});