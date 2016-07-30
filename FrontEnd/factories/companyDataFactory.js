main_module.factory('companyDataFactory',function($resource){
    
    console.log('companyDataFactory loaded');
    
    factoryCompanyData = {};
    
    factoryCompanyData.selected_id = null;
    factoryCompanyData.selected = null;
    factoryCompanyData.array = [];
    
    factoryCompanyData.getInformation = function(callbackFunc){
        
        console.log("companyDataFactory/getInformation");
        
        //console.log('factoryCompanyData.array.length: ' + factoryCompanyData.array.length);
        //console.log('factoryCompanyData.selected_id: ' + factoryCompanyData.selected_id);
        //console.log('factoryCompanyData.array:');
        //console.log(factoryCompanyData.array);
        //console.log('factoryCompanyData.selected:');
        //console.log(factoryCompanyData.selected);
        
        //if (factoryCompanyData.array.length === 0){
            
            var resource = $resource('/companies',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
                console.log('companyDataFactory/getInformation:success');
                console.log(data);

              factoryCompanyData.array = data;
              callbackFunc(factoryCompanyData.array);    
                
            },function(error){
                
                console.log('companyDataFactory/getInformation:fail');
                console.log(error.message);
                
                factoryCompanyData.array = [];
                callbackFunc(factoryCompanyData.array);
            });
            /*
        } else {
            
            console.log("companyDataFactory/getCompanyInformation: array.length != 0");
            callbackFunc(factoryCompanyData.array);
        }*/
    }
    
    
    factoryCompanyData.insertData = function(data){
        
        console.log('companyDataFactory/insertData');
        console.log(data);
        
        // luo resurssi objekti
        var resource = $resource('/companies',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factoryCompanyData.updateData = function(data){
        
        console.log('companyDataFactory/updateData');
        console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/companies',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factoryCompanyData.deleteData = function(data){
        
        console.log('companyDataFactory/deleteData');
        console.log(data);
        
        // luo resurssi objekti
        var resource = $resource('/companies',{},{'delete':{method:'DELETE'}});
        // lähetä data DELETElla ja palauta $promise:n
        return resource.delete(data).$promise;
    }
    
    
    /**
      *This function searches an company from array containing an id
      *that was stored when user cliked the row in the partial_companyDataView
      *page. When it finds the correct one from the array, it returns
      *that object.
      */
    factoryCompanyData.getSelected = function(){
        
        console.log('companyDataFactory/getSelected');
        //console.log('factory5.array.length: ' + factory5.array.length);
        //console.log('factory5.selected_id: ' + factory5.selected_id);
        
        for (var i = 0; i < factoryCompanyData.array.length; i++){
            if (factoryCompanyData.array[i]._id === factoryCompanyData.selected_id){
                //console.log(factory5.array[i]);
                factoryCompanyData.selected = factoryCompanyData.array[i];
                return factoryCompanyData.array[i];
            }
        }
    }
    
    
    return factoryCompanyData;
    
});