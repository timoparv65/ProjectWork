main_module.controller('employeeEditServiceController',function($scope,serviceDataFactory,$location,Flash){
    
    console.log('employeeEditServiceController loaded');
    
    $scope.navbarData = {
        
        urls:[],
        texts:[],
        classes:[]
    }
    
    var selectedService = serviceDataFactory.getSelected();
    console.log('selectedService: ' + selectedService);
    
    $scope.id = selectedService._id;
    console.log('$scope.id: ' + $scope.id);
    $scope.category = selectedService.category;
    console.log('$scope.category: ' + $scope.category);
    $scope.description = selectedService.description;
    console.log('$scope.description: ' + $scope.description);
    $scope.duration = selectedService.duration;
    console.log('$scope.duration: ' + $scope.duration);
    $scope.code = selectedService.code;
    console.log('$scope.code: ' + $scope.code);
    
    $scope.saveServiceClicked = function(){
        
        console.log('employeeEditServiceController/saveServiceClicked');
        
        var temp = {
            id:$scope.id,
            category:$scope.category,
            description:$scope.description,
            duration:$scope.duration,
            code:$scope.code
        }
        
        console.log(temp);
        
        serviceDataFactory.updateData(temp).then(success,error); 
    }
    
    function success(){
        serviceDataFactory.array = [];
        $location.path('/tyontekijan_palvelut_paavalikko').replace();
    }
    
    function error(data){
        Flash.create('danger',data.message, 'custom-class'); 
    }
    
});