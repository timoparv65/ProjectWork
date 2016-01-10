main_module.controller('employeeReservationsController',function($scope,employeeDataFactory){
    
    console.log('employeeReservationsController loaded');
    
    employeeDataFactory.getEmployees(dataCallback);
    
    
    function dataCallback(dataArray){
    
        console.log('employeeReservationsController/dataCallback');
    
        $scope.employeeData = dataArray;
        
        console.log($scope.employeeData);
    }
    
});
