main_module.factory('serviceDataFactory',function($resource){
    
    console.log('serviceDataFactory loaded');
    
    factory = {};
    factory.selected_id = null;
    
    factory.serviceArray = [];
    factory.selectedService = null;
    
    
    
    factory.insertData = function(data){
        
        console.log('serviceDataFactory/insertData');
        console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/servicechoises',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factory.updateData = function(data){
        
        console.log('serviceDataFactory/updateData');
        console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/serviceChoises',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factory.deleteData = function(data){
        
        console.log('serviceDataFactory/deleteData');
        console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/servicechoises',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise
        return resource.delete(data).$promise;
    }
    
    
    factory.getServices = function(callbackFunc){
        
        console.log('serviceDataFactory/getServices');
        console.log('factory.serviceArray.length: ' + factory.serviceArray.length);
        
        if(factory.serviceArray.length === 0){
            
            var resource = $resource('/servicechoises',{},{'get':{method:'GET'}});
            
            resource.query().$promise.then(function(data){
                
                console.log('serviceDataFactory/getServices:success');
                console.log(data);
                
                factory.serviceArray = data;
                callbackFunc(factory.serviceArray);
            },function(error){
                
                console.log('serviceDataFactory/getServices:fail');
                console.log(error.message);
                
                factory.serviceArray = [];
                callbackFunc(factory.serviceArray);
            });
        }else{
            
            callbackFunc(factory.serviceArray);
        }
        
    }
    
    factory.getSelectedService = function(){
        
        console.log('serviceDataFactory/getSelectedService');
        console.log('factory.serviceArray.length: ' + factory.serviceArray.length);
        console.log('factory.selected_id: ' + factory.selected_id);
        
        for (var i = 0; i < factory.serviceArray.length; i++){
            if (factory.serviceArray[i]._id === factory.selected_id){
                factory.selectedService = factory.serviceArray[i];
                return factory.serviceArray[i];
            }
        }
    }

    
    return factory;
    
});