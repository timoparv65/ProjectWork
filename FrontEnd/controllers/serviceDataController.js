main_module.controller('serviceDataController',function($scope,serviceChoiseDataFactory,$location){
    
    console.log('serviceDataController loaded');
    
    $scope.serviceData = [];
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/sovelluksen_hallinnointi_paasivu','#/palvelut_paavalikko','#/palvelu_lisaa'],
        texts:['Poistu','Hallinnointi pääsivu','Palvelut','Lisää palvelu'],
        classes:['','','active','']
    }
    
    serviceChoiseDataFactory.getAll(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('serviceDataController/dataCallback');
        console.log(dataArray);
    
        $scope.serviceData = dataArray;
    }
    
    $scope.rowClicked = function(id){
        
        console.log('serviceDataController/rowClicked');
        
        serviceChoiseDataFactory.selected_id = id;
        console.log('serviceChoiseDataFactory.selected_id: ' + serviceChoiseDataFactory.selected_id);
        
        $location.path('/palvelu_muokkaa_poista').replace();

    }
    
});