main_module.factory('reservationDataFactory',function($resource){
    
    console.log('reservationDataFactory loaded');
    
    factoryReservationData = {};
    
    factoryReservationData.selected_id = null;
    factoryReservationData.selected = null;
    factoryReservationData.array = [];
    
    factoryReservationData.insertData = function(data){
        
        console.log('reservationDataFactory/insertData');
        
        var resource = $resource('/reservations',{},{'post':{method:'POST'}});
        // lähetä data POSTilla ja palauta $promise:n
        return resource.post(data).$promise;
    }
    
    
    
    return factoryReservationData;
    
});