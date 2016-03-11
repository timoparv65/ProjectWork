main_module.controller('serviceDataController',function($scope,employeeDataFactory,$location){
    
    console.log('serviceDataController loaded');
    
    $scope.serviceData = [];
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/sovelluksen_hallinnointi_paasivu','#/palvelut_paavalikko','#/palvelu_lisaa'],
        texts:['Poistu','Hallinnointi pääsivu','Palvelut','Lisää palvelu'],
        classes:['','','active','']
    }
    
    employeeDataFactory.getServiceChoises(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('serviceDataController/dataCallback');
        console.log(dataArray);
    
        $scope.serviceData = dataArray;
        
    }
    
    $scope.rowClicked = function(id){
        
        console.log('serviceDataController/rowClicked');
        
        employeeDataFactory.selected_service_choise_id = id;
        console.log('employeeDataFactory.selected_service_choise_id: ' + employeeDataFactory.selected_service_choise_id);
        
        //$location.path('/palvelu_muokkaa_poista').replace();
        $location.path('/palvelu_muokkaa_poista').replace();

    }
    
});