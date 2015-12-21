main_module.factory('serviceDataFactory',function(){
    
    console.log('serviceDataFactory loaded');
    
    factory = {};
    
    factory.serviceArray = [];
    
    factory.insertData = function(data){
        
        // luo resurssi objektin
        var resource = $resource('/employees',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
});