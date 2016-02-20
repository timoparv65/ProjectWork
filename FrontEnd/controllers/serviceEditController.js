main_module.controller('serviceEditController',function($scope,employeeDataFactory,$location,Flash){
    
    console.log('serviceEditController loaded');
    
    $scope.selectedService = employeeDataFactory.getSelectedServiceChoise();
    console.log($scope.selectedService);
    
    $scope.id = $scope.selectedService._id;
    $scope.category = $scope.selectedService.category;
    $scope.description = $scope.selectedService.description;
    $scope.duration = $scope.selectedService.duration;
    $scope.code = $scope.selectedService.code;
    
    $scope.saveServiceClicked = function(){
        
        console.log('serviceEditController/saveEmployeeClicked');
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveService').attr("disabled", true);
        
        var temp = {
            id:$scope.id,
            category:$scope.category,
            description:$scope.description,
            duration:$scope.duration,
            code:$scope.code
        }
        
        console.log(temp);
        
        employeeDataFactory.updateServiceChoiseData(temp).then(success,error);
        
    }
    
    function success(){
        
        console.log('serviceEditController/success');
        
        employeeDataFactory.serviceChoiseArray = [];
        $scope.category = "";
        $scope.description = "";
        $scope.duration = "";
        $scope.code = "";
        
        Flash.create('success', 'Palvelun tietoja muokattu onnistuneesti!', 'custom-class');
        
        // sallitaan Save-napin painaminen
        $('#saveService').attr("disabled", false);
        //$location.path('palvelut_paavalikko').replace();
    }
    
    function error(data){
        
        console.log('serviceEditController/error');
        
        Flash.create('danger','Palvelun tietojen muokkaus epäonnistui. Koodi oli jo käytössä!', 'custom-class'); 
    }
    
});
