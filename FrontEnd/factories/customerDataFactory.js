main_module.factory('customerDataFactory',function($resource){
    
    factoryCustomerData = {};
    
    console.log('customerDataFactory loaded');
    
    factoryCustomerData.array = [];
    
    factoryCustomerData.getCustomer = function(callbackFunc){
        
        console.log('customerDataFactory/getCustomer');
        
        var resource = $resource('/get_customer_information',{},{'get':{method:'GET'}});
        resource.query().$promise.then(function(data){

            console.log('customerDataFactory/getCustomer:success');
            //console.log(data);
            
            //Create a resource for context '/customers/singleByName'
            var resource2 = $resource('/customers/singleByName',{name:data[0].customerId},{'get':{method:'GET'}});
            
            resource2.query().$promise.then(function(returnData){

                console.log('customerDataFactory/getCustomer/singleByName:success');
                console.log(returnData);

                factoryCustomerData.array = returnData;
                callbackFunc(factoryCustomerData.array);
            },function(error2){

                console.log('customerDataFactory/getCustomer/singleByName:fail');
                console.log(error2.message);

                factoryCustomerData.array = [];
                callbackFunc(factoryCustomerData.array);
            });

        },function(error){

            console.log('customerDataFactory/getCustomer:fail');
            console.log(error.message);

            factoryCustomerData.array = [];
            callbackFunc(factoryCustomerData.array);
        });
    }
    

    return factoryCustomerData;
    
});