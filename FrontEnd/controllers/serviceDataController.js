main_module.controller('serviceDataController',function($scope,serviceDataFactory,$location){
    
    console.log('serviceDataController loaded');
    
    serviceDataFactory.getServices(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('serviceDataController/dataCallback');
        console.log(dataArray);
    
        $scope.serviceData = dataArray;
        
    }
    
    $scope.rowClicked = function(id){
        
        console.log('serviceDataController/rowClicked');
        
        serviceDataFactory.selected_id = id;
        console.log('serviceDataFactory.selected_id: ' + serviceDataFactory.selected_id);
        
        $location.path('/palvelut_muokkaa_poista_paavalikko').replace();

    }
    
});