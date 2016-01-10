main_module.factory('employeeDataFactory',function($resource){
    
    console.log('employeeDataFactory loaded');
    
    factory = {};
    factory.selected_id = null;
    
    factory.employeeArray = [];
    
    factory.getEmployees = function(callbackFunc){
        
        console.log('employeeDataFactory/getEmployees');
        
        if(factory.employeeArray.length === 0){
            var resource = $resource('/employees',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
                console.log('employeeDataFactory/getEmployees:success');
                console.log(data);

              factory.employeeArray = data;
              callbackFunc(factory.employeeArray);    
                
            },function(error){
                
                console.log('employeeDataFactory/getEmployees:fail');
                console.log(error.message);
                
                factory.employeeArray = [];
                callbackFunc(factory.employeeArray);
            });
        }else{
            callbackFunc(factory.employeeArray);
        }
    }
    
    factory.insertData = function(data){
        
        console.log('employeeDataFactory/insertData');
        console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/employees',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    
    /**
      *This function searches an employee from array containing an id
      *that was stored when user cliked the row in the partial_employeeDataView
      *page. When it finds the correct one from the array, it returns
      *that object.
      */
    factory.getSelectedEmployee = function(){
        
        console.log('employeeDataFactory/getSelectedEmployee');
        
        for (var i = 0; i < factory.employeeArray.length; i++){
            if (factory.employeeArray[i]._id === factory.selected_id){
                console.log(factory.employeeArray[i]);
                return factory.employeeArray[i];
            }
        }
    }
    
    return factory;
    
});