main_module.factory('customerLoginFactory',function($resource){
    
    factoryCustomerLogin = {};
    
    console.log('customerLoginFactory loaded');
    
    // lisätty 27.3.2016
    factoryCustomerLogin.startLogin = function(data){
        
        console.log('customerLoginFactory/startLogin');
        
        //Create a resource for context '/customers/login'
        var req = $resource('/customers/login',{},{'post':{method:'POST'}});
        //Use POST method to send the usrename and password to above context
        //Note that we return an promise object from here
        return req.post(data).$promise;
    }
    
    factoryCustomerLogin.startRegister = function(data){
        
        console.log('customerLoginFactory/startRegister');
        
        var req = $resource('/customers/register',{},{'post':{method:'POST'}});
        return req.post(data).$promise;
    }
    
    return factoryCustomerLogin;
    
});