main_module.controller('employeeServiceMainController',function($scope,employeeDataFactory,Flash,$location){
    
    console.log('employeeServiceMainController loaded');
    
    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    
    employeeDataFactory.getServices(dataCallback);
    
    
    function dataCallback(dataArray){
    
        console.log('employeeServiceMainController/dataCallback');
        console.log(dataArray);
        
        $scope.ServiceData = dataArray;
    }
    
    $scope.rowClicked = function(id){
        
        console.log('employeeServiceMainController/rowClicked');
        
        employeeDataFactory.selected_service_id = id;
        console.log('employeeDataFactory.selected_service_id: ' + employeeDataFactory.selected_service_id);
        
        $location.path('/tyontekija_muokkaa_palvelua').replace();
    }
    
});