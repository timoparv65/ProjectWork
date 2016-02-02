main_module.controller('employeeListFunctionsController',function($scope,employeeDataFactory,$location){

    console.log('employeeListFunctionsController loaded');

    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log($scope.selectedEmployee);
    
    //localStorage['selectedEmployee'] = $scope.selectedEmployee.name;
    //console.log($scope.selectedEmployee.name);
    //console.log(localStorage['selectedEmployee']);
    
});