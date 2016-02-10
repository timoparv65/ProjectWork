main_module.controller('employeeListFunctionsController',function($scope,employeeDataFactory,$location){

    console.log('employeeListFunctionsController loaded');

    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log('$scope.selectedEmployee');
    console.log($scope.selectedEmployee);
    
});