main_module.controller('serviceListFunctionsController',function($scope,serviceChoiseDataFactory,$location){

    console.log('serviceListFunctionsController loaded');
    
    $scope.navbarData = {
        
        urls:[],
        texts:[],
        classes:[]
    }

    $scope.selectedService = serviceChoiseDataFactory.getSelected();
    console.log('$scope.selectedService');
    console.log($scope.selectedService);
    
});