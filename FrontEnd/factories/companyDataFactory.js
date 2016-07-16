main_module.factory('companyDataFactory',function($resource){
    
    console.log('companyDataFactory loaded');
    
    factoryCompanyData = {};
    
    factoryCompanyData.selected_id = null;
    factoryCompanyData.selectedCompany = null;
    factoryCompanyData.companyArray = [];
    
    factoryCompanyData.getCompanyInformation = function(callbackFunc){
        
        console.log("companyDataFactory/getCompanyInformation");
        
        //console.log('factoryCompanyData.companyArray.length: ' + factoryCompanyData.companyArray.length);
        //console.log('factoryCompanyData.selected_id: ' + factoryCompanyData.selected_id);
        //console.log('factoryCompanyData.companyArray:');
        //console.log(factoryCompanyData.companyArray);
        //console.log('factoryCompanyData.selectedCompany:');
        //console.log(factoryCompanyData.selectedCompany);
        
        //if (factoryCompanyData.companyArray.length === 0){
            
            var resource = $resource('/companies',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
                console.log('companyDataFactory/getCompanyInformation:success');
                console.log(data);

              factoryCompanyData.companyArray = data;
              callbackFunc(factoryCompanyData.companyArray);    
                
            },function(error){
                
                console.log('companyDataFactory/getCompanyInformation:fail');
                console.log(error.message);
                
                factoryCompanyData.companyArray = [];
                callbackFunc(factoryCompanyData.companyArray);
            });
            /*
        } else {
            
            console.log("companyDataFactory/getCompanyInformation: companyArray.length != 0");
            callbackFunc(factoryCompanyData.companyArray);
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
    factoryCompanyData.getSelectedCompany = function(){
        
        console.log('companyDataFactory/getSelectedCompany');
        //console.log('factory5.companyArray.length: ' + factory5.companyArray.length);
        //console.log('factory5.selected_id: ' + factory5.selected_id);
        
        for (var i = 0; i < factoryCompanyData.companyArray.length; i++){
            if (factoryCompanyData.companyArray[i]._id === factoryCompanyData.selected_id){
                //console.log(factory5.companyArray[i]);
                factoryCompanyData.selectedCompany = factoryCompanyData.companyArray[i];
                return factoryCompanyData.companyArray[i];
            }
        }
    }
    
    
    return factoryCompanyData;
    
});