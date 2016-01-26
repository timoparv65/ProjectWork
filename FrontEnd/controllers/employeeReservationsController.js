main_module.controller('employeeReservationsController',function($scope,employeeDataFactory){
    
    console.log('employeeReservationsController loaded');
    
    //employeeDataFactory.init;
    employeeDataFactory.getEmployees(dataCallback);
    
    
    function dataCallback(dataArray){
    
        console.log('employeeReservationsController/dataCallback');
        console.log(dataArray);
    
        $scope.employeeData = dataArray;
    }
    
});
