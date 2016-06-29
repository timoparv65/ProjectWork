main_module.factory('companyDataFactory',function($resource){
    
    console.log('companyDataFactory loaded');
    
    factory5 = {};
    
    factory5.selected_id = null;
    factory5.selectedCompany = null;
    factory5.companyArray = [];
    
    factory5.getCompanyInformation = function(callbackFunc){
        
        console.log("companyDataFactory/getCompanyInformation");
        
        //console.log('factory5.companyArray.length: ' + factory5.companyArray.length);
        //console.log('factory5.selected_id: ' + factory5.selected_id);
        //console.log('factory5.companyArray:');
        //console.log(factory5.companyArray);
        //console.log('factory5.selectedCompany:');
        //console.log(factory5.selectedCompany);
        
        //if (factory5.companyArray.length === 0){
            
            var resource = $resource('/companies',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
                console.log('companyDataFactory/getCompanyInformation:success');
                console.log(data);

              factory5.companyArray = data;
              callbackFunc(factory5.companyArray);    
                
            },function(error){
                
                console.log('companyDataFactory/getCompanyInformation:fail');
                console.log(error.message);
                
                factory5.companyArray = [];
                callbackFunc(factory5.companyArray);
            });
            /*
        } else {
            
            console.log("companyDataFactory/getCompanyInformation: companyArray.length != 0");
            callbackFunc(factory.companyArray);
        }*/
    }
    
    
    factory5.insertData = function(data){
        
        console.log('companyDataFactory/insertData');
        console.log(data);
        
        // luo resurssi objekti
        var resource = $resource('/companies',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    factory5.updateData = function(data){
        
        console.log('companyDataFactory/updateData');
        console.log(data);
        
        // luo resurssi objektin
        var resource = $resource('/companies',{},{'put':{method:'PUT'}});
        // lähetä data PUTilla ja palauta $promise
        return resource.put(data).$promise;
    }
    
    factory5.deleteData = function(data){
        
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
    factory5.getSelectedCompany = function(){
        
        console.log('companyDataFactory/getSelectedCompany');
        //console.log('factory5.companyArray.length: ' + factory5.companyArray.length);
        //console.log('factory5.selected_id: ' + factory5.selected_id);
        
        for (var i = 0; i < factory5.companyArray.length; i++){
            if (factory5.companyArray[i]._id === factory5.selected_id){
                //console.log(factory5.companyArray[i]);
                factory5.selectedCompany = factory5.companyArray[i];
                return factory5.companyArray[i];
            }
        }
    }
    
    
    return factory5;
    
});