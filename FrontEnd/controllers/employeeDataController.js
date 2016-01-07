main_module.controller('employeeDataController',function($scope,employeeDataFactory,$location){
    
    console.log('employeeDataController loaded');
    
    employeeDataFactory.getEmployees(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('employeeDataController/dataCallback');
    
        $scope.employeeData = dataArray;
    }
    
    $scope.rowClicked = function(id){
        
        employeeDataFactory.selected_id = id;
        $location.path('/lisaa_tyontekijan_tyotehtavat').replace();
    }
    
});