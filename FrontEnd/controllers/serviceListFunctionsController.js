main_module.controller('serviceListFunctionsController',function($scope,employeeDataFactory,$location){

    console.log('serviceListFunctionsController loaded');

    $scope.selectedService = employeeDataFactory.getSelectedServiceChoise();
    console.log('$scope.selectedService');
    console.log($scope.selectedService);
    
});