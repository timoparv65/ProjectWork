main_module.factory('employeeDataFactory',function($resource){
    
    factory = {};
    
    factory.employeeArray = [];
    
    factory.getEmployees = function(callbackFunc){
        
        if(factory.employeeArray.length === 0){
            var resource = $resource('/employees',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
              factory.employeeArray = data;
              callbackFunc(factory.employeeArray);    
                
            },function(error){
                
                factory.employeeArray = [];
                callbackFunc(factory.employeeArray);
            });
        }else{
            callbackFunc(factory.employeeArray);
        }
    }
    
    factory.insertData = function(data){
        
        // luo resurssi objektin
        var resource = $resource('/employees',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    return factory;
    
});