main_module.factory('employeeDataFactory',function($resource){
    
    console.log('employeeDataFactory loaded');
    
    factory = {};
    factory.selected_id = null;
    factory.selected_service_id = null;
    
    factory.employeeArray = [];
    factory.serviceArray = [];
    factory.selectedEmployee = null;
    
    
    factory.getEmployees = function(callbackFunc){
        
        console.log('employeeDataFactory/getEmployees');
        console.log('factory.employeeArray.length: ' + factory.employeeArray.length);
        console.log('factory.selected_id: ' + factory.selected_id);
        console.log('factory.selected_service_id: ' + factory.selected_service_id);
        console.log('factory.employeeArray: ' + factory.employeeArray);
        console.log('factory.serviceArray:' + factory.serviceArray);
        console.log('factory.selectedEmployee: ' + factory.selectedEmployee);
        
        if(factory.employeeArray.length === 0){
            
            var resource = $resource('/employees',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
                console.log('employeeDataFactory/getEmployees:success');
                console.log('data: ' + data);

              factory.employeeArray = data;
              callbackFunc(factory.employeeArray);    
                
            },function(error){
                
                console.log('employeeDataFactory/getEmployees:fail');
                console.log('error: ' + error.message);
                
                factory.employeeArray = [];
                callbackFunc(factory.employeeArray);
            });
        }else{
            
            callbackFunc(factory.employeeArray);
        }
    }
    
    factory.insertData = function(data){
        
        console.log('employeeDataFactory/insertData');
        console.log('data: ' + data);
        
        // luo resurssi objekti
        var resource = $resource('/employees',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factory.deleteData = function(data){
        
        console.log('employeeDataFactory/deleteData');
        console.log('data: ' + data);
        
        // luo resurssi objekti
        var resource = $resource('/employees',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise:n
        return resource.delete(data).$promise;
    }
    
    
    factory.insertServiceData = function(data){
        
        console.log('employeeDataFactory/insertServiceData');
        console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/services',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    
    factory.getServices = function(callbackFunc){
        
        console.log('employeeDataFactory/getServices');
        console.log('factory.serviceArray.length: ' + factory.serviceArray.length);
        console.log('factory.selectedEmployee.name: ' + factory.selectedEmployee.name);
        
        if(factory.serviceArray.length === 0){
            
            var resource = $resource('/services',{name:factory.selectedEmployee.name},{'get':{method:'GET'}});
            
            resource.query().$promise.then(function(data){
                
                console.log('employeeDataFactory/getServices:success');
                
                factory.serviceArray = data;
                callbackFunc(factory.serviceArray);
            },function(error){
                
                console.log('employeeDataFactory/getServices:fail');
                console.log(error.message);
                
                factory.serviceArray = [];
                callbackFunc(factory.serviceArray);
            });
        }else{
            
            callbackFunc(factory.serviceArray);
        }
        
    }
    
    
    /**
      *This function searches an employee from array containing an id
      *that was stored when user cliked the row in the partial_employeeDataView
      *page. When it finds the correct one from the array, it returns
      *that object.
      */
    factory.getSelectedEmployee = function(){
        
        console.log('employeeDataFactory/getSelectedEmployee');
        console.log('factory.employeeArray.length: ' + factory.employeeArray.length);
        console.log('factory.selected_id: ' + factory.selected_id);
        
        for (var i = 0; i < factory.employeeArray.length; i++){
            if (factory.employeeArray[i]._id === factory.selected_id){
                //console.log(factory.employeeArray[i]);
                factory.selectedEmployee = factory.employeeArray[i];
                return factory.employeeArray[i];
            }
        }
    }
    
    return factory;
    
});