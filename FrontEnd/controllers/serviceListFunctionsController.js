main_module.controller('serviceListFunctionsController',function($scope,serviceDataFactory,$location){

    console.log('serviceListFunctionsController loaded');

    $scope.selectedService = serviceDataFactory.getSelectedService();
    console.log('$scope.selectedService');
    console.log($scope.selectedService);
    
});