main_module.controller('serviceDataController',function($scope,employeeDataFactory,$location){
    
    console.log('serviceDataController loaded');
    
    $scope.navbarData = {
        
        urls:[],
        texts:[],
        classes:[]
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
        
        //$location.path('/palvelut_muokkaa_poista_paavalikko').replace();
        $location.path('/palvelu_muokkaa_poista').replace();

    }
    
});