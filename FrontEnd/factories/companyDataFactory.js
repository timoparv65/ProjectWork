main_module.factory('companyDataFactory',function($resource){
    
    console.log('companyDataFactory loaded');
    
    factory = {};
    
    factory.selected_id = null;
    factory.selectedCompany = null;
    factory.companyArray = [];
    
    factory.getCompanyInformation = function(callbackFunc){
        
        console.log("companyDataFactory/getCompanyInformation");
        
        //console.log('factory.companyArray.length: ' + factory.companyArray.length);
        console.log('factory.selected_id: ' + factory.selected_id);
        console.log('factory.companyArray:');
        console.log(factory.companyArray);
        console.log('factory.selectedCompany:');
        console.log(factory.selectedCompany);
        
        //if (factory.companyArray.length === 0){
            
            var resource = $resource('/companies',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
                console.log('companyDataFactory/getCompanyInformation:success');
                console.log(data);

              factory.companyArray = data;
              callbackFunc(factory.companyArray);    
                
            },function(error){
                
                console.log('companyDataFactory/getCompanyInformation:fail');
                console.log(error.message);
                
                factory.companyArray = [];
                callbackFunc(factory.companyArray);
            });
            /*
        } else {
            
            console.log("companyDataFactory/getCompanyInformation: companyArray.length != 0");
            callbackFunc(factory.companyArray);
        }*/
    }
    
    
    factory.insertData = function(data){
        
        console.log('companyDataFactory/insertData');
        console.log(data);
        
        // luo resurssi objekti
        var resource = $resource('/companies',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factory.updateData = function(data){
        
        console.log('companyDataFactory/updateData');
        console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/companies',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factory.deleteData = function(data){
        
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
    factory.getSelectedCompany = function(){
        
        console.log('companyDataFactory/getSelectedCompany');
        console.log('factory.companyArray.length: ' + factory.companyArray.length);
        console.log('factory.selected_id: ' + factory.selected_id);
        
        for (var i = 0; i < factory.companyArray.length; i++){
            if (factory.companyArray[i]._id === factory.selected_id){
                //console.log(factory.companyArray[i]);
                factory.selectedCompany = factory.companyArray[i];
                return factory.companyArray[i];
            }
        }
    }
    
    
    return factory;
    
});