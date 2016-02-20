main_module.controller('serviceDeleteEditController',function($scope,employeeDataFactory,$location,Flash){
    
    console.log('serviceDeleteEditController loaded');
    
    $scope.deleteArray = [];
    
    $scope.selectedService = employeeDataFactory.getSelectedServiceChoise();
    console.log($scope.selectedService);
    
    $scope.id = $scope.selectedService._id;
    $scope.category = $scope.selectedService.category;
    $scope.description = $scope.selectedService.description;
    $scope.duration = $scope.selectedService.duration;
    $scope.code = $scope.selectedService.code;
    
    $scope.saveServiceClicked = function(){
        
        console.log('serviceDeleteEditController/saveServiceClicked');
        
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
        
        console.log('serviceDeleteEditController/success');
        
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
        
        console.log('serviceDeleteEditController/error');
        
        Flash.create('danger','Palvelun tietojen muokkaus epäonnistui. Koodi oli jo käytössä!', 'custom-class');
        
        // sallitaan Save-napin painaminen
        $('#saveService').attr("disabled", false);
    }
    
    $scope.deleteServiceClicked = function(){
        
        console.log('serviceDeleteEditController/deleteServiceClicked');
        
        //Add the id to our delete array
        var id = $scope.id;
        console.log(id);
        $scope.deleteArray.push(id);
        
        //Nothing to delete
        if($scope.deleteArray.length === 0){
            
            Flash.create('danger','Ei mitään poistettavaa palvelua!', 'custom-class');
            console.log('nothing to delete');
        }
        else{
            
            var data = {
                
                forDelete:$scope.deleteArray
            }
            console.log(data);
            
            employeeDataFactory.deleteServiceChoiseData(data).then(function(data){

                employeeDataFactory.serviceChoiseArray = [];
                $location.path('/palvelut_paavalikko').replace();
                
            },function(error){
                
                Flash.create('danger','Palvelun tietojen poisto epäonnistui!', 'custom-class'); 
                console.log('error in server');
            });
        }
        
    }
    
    
});
