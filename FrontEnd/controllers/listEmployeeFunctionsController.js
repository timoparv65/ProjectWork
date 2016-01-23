main_module.controller('listEmployeeFunctionsController',function($scope,employeeDataFactory,$location){

    console.log('listEmployeeFunctionsController loaded');

    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log('$scope.selectedEmployee: ' + $scope.selectedEmployee)
    
});