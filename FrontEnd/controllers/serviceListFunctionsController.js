main_module.controller('serviceListFunctionsController',function($scope,employeeDataFactory,$location){

    console.log('serviceListFunctionsController loaded');
    
    $scope.navbarData = {
        
        urls:[],
        texts:[],
        classes:[]
    }

    $scope.selectedService = employeeDataFactory.getSelectedServiceChoise();
    console.log('$scope.selectedService');
    console.log($scope.selectedService);
    
});