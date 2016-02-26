main_module.factory('employeeLoginFactory',function($resource){
    
    console.log('employeeLoginFactory loaded');
    
    var factory = {};
    
    //This function can be called from ANY controller using this factory
    //implementation
    
    factory.startLogin = function(data){
        
        console.log('employeeLoginFactory/startLogin');
        
        //Create a resource for context '/employees/login'
        var req = $resource('/employees/login',{},{'post':{method:'POST'}});
        //Use POST method to send the usrename and password to above context
        //Note that we return an promise object from here
        return req.post(data).$promise;
    }
    
    //lisätty 26.2.2016
    factory.checkRole = function(){
        
         console.log('employeeLoginFactory/checkRole');
        
         var req = $resource('/permission_to_company_private_pages',{},{'get':{method:'GET'}});
         return req.query().$promise;
    }
    
    /*
    factory.startRegister = function(data){
    
    console.log('employeeLoginFactory/startRegister');
        
        var req = $resource('/employees/register',{},{'post':{method:'POST'}});
        return req.post(data).$promise;
    }
    */
    
    //Factory must always return an object!!!!
    return factory;
    
});