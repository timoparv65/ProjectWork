main_module.factory('companyDataFactory',function($resource){
    
    console.log('companyDataFactory loaded');
    
    factory = {};
    
    factory.informationArray = [];
    
    factory.getCompanyInformation = function(callbackFunc){
        
        console.log("companyDataFactory/getCompanyInformation");
        
        if (factory.informationArray.length === 0){
            
            var resource = $resource('/companies',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
                console.log('companyDataFactory/getCompanyInformation:success');
                console.log(data);

              factory.informationArray = data;
              callbackFunc(factory.informationArray);    
                
            },function(error){
                
                console.log('companyDataFactory/getCompanyInformation:fail');
                console.log(error.message);
                
                factory.informationArray = [];
                callbackFunc(factory.informationArray);
            });
            
        } else {
            
            console.log("companyDataFactory/getCompanyInformation: informationArray.length != 0");
            callbackFunc(factory.informationArray);
        }
    }
    
    
    return factory;
    
});