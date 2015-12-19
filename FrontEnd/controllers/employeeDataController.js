main_module.controller('employeeDataController',function($scope,employeeDataFactory,Flash){
    
    console.log('employeeDataController loaded');
    
    employeeDataFactory.getEmployees(dataCallback);
    
    
    function dataCallback(dataArray){
    
        console.log('employeeDataController/dataCallback');
    
        $scope.employeeData = dataArray;
    }
    
});
