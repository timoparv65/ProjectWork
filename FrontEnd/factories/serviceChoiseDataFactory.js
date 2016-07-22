main_module.factory('serviceChoiseDataFactory',function($resource){
    
    console.log('serviceChoiseDataFactory loaded');
    
    factoryServiceChoiseData = {};
    
    factoryServiceChoiseData.selected_id = null;
    factoryServiceChoiseData.array = [];
    factoryServiceChoiseData.selected = null;
    
    factoryServiceChoiseData.insertData = function(data){
        
        console.log('serviceChoiseDataFactory/insertData');
       // console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/servicechoises',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factoryServiceChoiseData.updateData = function(data){
        
        console.log('serviceChoiseDataFactory/updateData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/servicechoises',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factoryServiceChoiseData.deleteData = function(data){
        
        console.log('serviceChoiseDataFactory/deleteData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/servicechoises',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise
        return resource.delete(data).$promise;
    }
    
    
    factoryServiceChoiseData.getAll = function(callbackFunc){
        
        console.log('serviceChoiseDataFactory/getAll');
        //console.log('factoryServiceChoiseData.array.length: ' + factoryServiceChoiseData.array.length);
        
        //if(factoryServiceChoiseData.array.length === 0){
            
            var resource = $resource('/servicechoises',{},{'get':{method:'GET'}});
            
            resource.query().$promise.then(function(data){
                
                console.log('serviceChoiseDataFactory/getAll:success');
                //console.log(data);
                
                factoryServiceChoiseData.array = data;
                callbackFunc(factoryServiceChoiseData.array);
            },function(error){
                
                console.log('serviceChoiseDataFactory/getAll:fail');
                console.log(error.message);
                
                factoryServiceChoiseData.array = [];
                callbackFunc(factoryServiceChoiseData.array);
            });
        /*}else{
            console.log('factoryServiceChoiseData/getChoises:success, factoryServiceChoiseData.array.length != 0');
            callbackFunc(factoryServiceChoiseData.array);
        }*/
        
    }
    
    factoryServiceChoiseData.getSelected = function(){
        
        console.log('serviceChoiseDataFactory/getSelected');
        //console.log('factoryServiceChoiseData.array.length: ' + factoryServiceChoiseData.array.length);
        //console.log('factoryServiceChoiseData.selected_id: ' + factoryServiceChoiseData.selected_id);
        
        for (var i = 0; i < factoryServiceChoiseData.array.length; i++){
            if (factoryServiceChoiseData.array[i]._id === factoryServiceChoiseData.selected_id){
                factoryServiceChoiseData.selected = factoryServiceChoiseData.rray[i];
                return factoryServiceChoiseData.array[i];
            }
        }
    }
    
    
    return factoryServiceChoiseData;
    
});