main_module.factory('serviceDataFactory',function($resource){
    
    console.log('serviceDataFactory loaded');
    
    factory = {};
    
    factory.serviceArray = [];
    
    factory.insertData = function(data){
        
        console.log('serviceDataFactory/insertData');
        console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/services',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    return factory;
    
});