main_module.controller('listEmployeeFunctionsController',function($scope,employeeDataFactory,$location){

    console.log('listEmployeeFunctionsController loaded');

    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    
    employeeDataFactory.getServices(dataCallback);
    
    
    function dataCallback(dataArray){
    
        console.log('listEmployeeFunctionsController/dataCallback');
        console.log('dataArray' + dataArray);
        
        $scope.ServiceData = dataArray;
    }
    
});