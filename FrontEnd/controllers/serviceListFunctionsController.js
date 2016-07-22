main_module.controller('serviceListFunctionsController',function($scope,employeeDataFactory,serviceChoiseDataFactory,$location){

    console.log('serviceListFunctionsController loaded');
    
    $scope.navbarData = {
        
        urls:[],
        texts:[],
        classes:[]
    }

    //$scope.selectedService = employeeDataFactory.getSelectedServiceChoise();
    $scope.selectedService = serviceChoiseDataFactory.getSelectedChoise();
    console.log('$scope.selectedService');
    console.log($scope.selectedService);
    
});