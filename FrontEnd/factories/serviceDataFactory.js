main_module.factory('serviceDataFactory',function($resource){
    
    console.log('serviceDataFactory loaded');
    
    factoryServiceData = {};
    
    factoryServiceData.array = [];
    factoryServiceData.selected_id = null;
    factoryServiceData.selected = null;
    
    factoryServiceData.insertData = function(data){
        
        console.log('serviceDataFactory/insertData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/services',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factoryServiceData.updateData = function(data){
        
        console.log('serviceDataFactory/updateData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/services',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factoryServiceData.deleteData = function(data){
        
        console.log('serviceDataFactory/deleteData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/services',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise
        return resource.delete(data).$promise;
    }
    
    
    factoryServiceData.getAll = function(selectedEmployee, callbackFunc){
        
        console.log('serviceDataFactory/getAll');
        console.log('selectedEmployee');
        console.log(selectedEmployee);
        //console.log('selectedEmployee.name: ' + selectedEmployee.name);
           
        var resource = $resource('/services',{name:selectedEmployee.name},{'get':{method:'GET'}});

        resource.query().$promise.then(function(data){

            console.log('serviceDataFactory/getAll:success');
            console.log(data);

            factoryServiceData.array = data;
            callbackFunc(factoryServiceData.array);
        },function(error){

            console.log('serviceDataFactory/getAll:fail');
            console.log(error.message);

            factoryServiceData.array = [];
            callbackFunc(factoryServiceData.array);
        });
        
    }
    
    factoryServiceData.getSelected = function(){
        
        console.log('serviceDataFactory/getSelected');
        //console.log('factoryServiceData.selected_id: ' + factoryServiceData.selected_id);
        //console.log('factoryServiceData.array.length: ' + factoryServiceData.array.length);
        
        for (var i = 0; i < factoryServiceData.array.length; i++){
            if (factoryServiceData.array[i]._id === factoryServiceData.selected_id){
                factoryServiceData.selected = factoryServiceData.array[i];
                return factoryServiceData.array[i];
            }
        }
    }
    
    
    return factoryServiceData;
    
});