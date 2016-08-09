main_module.factory('employeeDataFactory',function($resource){
    
    factoryEmployeeData = {};
    
    console.log('employeeDataFactory loaded');
    
    factoryEmployeeData.selected_id = null;
    factoryEmployeeData.array = [];
    factoryEmployeeData.selected = null;
    
    factoryEmployeeData.getAll = function(callbackFunc){
        
        console.log('employeeDataFactory/getAll');
        //console.log('factoryEmployeeData.array.length: ' + factoryEmployeeData.array.length);
        //console.log('factoryEmployeeData.selected_id: ' + factoryEmployeeData.selected_id);
        //console.log('factoryEmployeeData.array:');
        //console.log(factoryEmployeeData.array);
        //console.log('factoryEmployeeData.selected:');
        //console.log(factoryEmployeeData.selected);
        
        //if(factoryEmployeeData.array.length === 0){
            
            var resource = $resource('/employees',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){

                console.log('employeeDataFactory/getAll:success');
                //console.log(data);

                factoryEmployeeData.array = data;
                callbackFunc(factoryEmployeeData.array);    
                
            },function(error){
                
                console.log('employeeDataFactory/getAll:fail');
                console.log(error.message);
                
                factoryEmployeeData.array = [];
                callbackFunc(factoryEmployeeData.array);
            });
        /*}else{
            
            console.log("employeeDataFactory/getAll: array.length != 0");
            callbackFunc(factoryEmployeeData.array);
        }*/
    }
    
    factoryEmployeeData.getByService = function(data, callBackFunc){
        console.log('employeeDataFactory/getByService');
        
        console.log('data');
        console.log(data);
        
        //Create a resource for context '/employees/service'
        var resource = $resource('/employees/service',{id:data.id},{'get':{method:'GET'}});
        
        resource.query().$promise.then(function(returnData){

            console.log('employeeDataFactory/getByService:success');
            console.log(returnData);

            factoryEmployeeData.array = returnData;
            callBackFunc(factoryEmployeeData.array);
        },function(error){

            console.log('employeeDataFactory/getByService:fail');
            console.log(error.message);

            factoryEmployeeData.array = [];
            callBackFunc(factoryEmployeeData.array);
        });
        
    }
    
    /**
      *This function searches an employee from array containing an id
      *that was stored when user cliked the row in the partial_employeeDataView
      *page. When it finds the correct one from the array, it returns
      *that object.
      */
    factoryEmployeeData.getSelected = function(){
        
        console.log('employeeDataFactory/getSelected');
        //console.log('factoryEmployeeData.array.length: ' + factoryEmployeeData.array.length);
        //console.log('factoryEmployeeData.selected_id: ' + factoryEmployeeData.selected_id);
        
        for (var i = 0; i < factoryEmployeeData.array.length; i++){
            if (factoryEmployeeData.array[i]._id === factoryEmployeeData.selected_id){
                //console.log(factoryEmployeeData.array[i]);
                factoryEmployeeData.selected = factoryEmployeeData.array[i];
                return factoryEmployeeData.array[i];
            }
        }
    }
    
    factoryEmployeeData.getByEmail = function(data, callBackFunc){
        
        console.log('employeeDataFactory/getByEmail');
        
        console.log('data');
        console.log(data);
        
        //Create a resource for context '/employees/singleByEmail'
        var resource = $resource('/employees/singleByEmail',{email:data.email},{'get':{method:'GET'}});
        
        resource.query().$promise.then(function(returnData){

            console.log('employeeDataFactory/getByEmail:success');
            console.log(returnData);

            factoryEmployeeData.array = returnData;
            callBackFunc(factoryEmployeeData.array);
        },function(error){

            console.log('employeeDataFactory/getByEmail:fail');
            console.log(error.message);

            factoryEmployeeData.array = [];
            callBackFunc(factoryEmployeeData.array);
        });
    }
    
    factoryEmployeeData.insertData = function(data){
        
        console.log('employeeDataFactory/insertData');
        //console.log(data);
        
        // luo resurssi objekti
        var resource = $resource('/employees',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factoryEmployeeData.updateData = function(data){
        
        console.log('employeeDataFactory/updateData');
        //console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/employees',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factoryEmployeeData.deleteData = function(data){
        
        console.log('employeeDataFactory/deleteData');
        //console.log(data);
        
        // luo resurssi objekti
        var resource = $resource('/employees',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise:n
        return resource.delete(data).$promise;
    }
    
    return factoryEmployeeData;
    
});