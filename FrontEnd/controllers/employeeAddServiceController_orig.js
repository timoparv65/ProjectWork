main_module.controller('employeeAddServiceController',function($scope,employeeDataFactory,$location){
    
    console.log('employeeAddServiceController loaded');
    
    var selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log('selectedEmployee:');
    console.log(selectedEmployee);
    
    //Funktiototeutus Save-nappulan painallukselle partial_addServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        
        console.log('employeeAddServiceController/saveServiceClicked');
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveService').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Employee määrittelyssä database.js:ssä
        var temp = {
            name:selectedEmployee.name,
            category:$scope.category,
            description:$scope.description,
            duration:$scope.duration,
            code:$scope.code
        };
        
        console.log(temp);
        
        if (temp.category.length === 0 ||
            temp.description.length === 0 ||
            temp.duration.length === 0 ||
            temp.code.length === 0){
            
            alert('Jokin kenttä tyhjä!');
            return;
        }
        
        var waitPromise = employeeDataFactory.insertServiceData(temp);
        
        waitPromise.then(function(response){
            
            console.log('employeeAddServiceController/saveServiceClicked/waitPromise:success');
            console.log(response.data);
            
            
            // queries.js/exports.saveNewService: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se serviceArray:hyn
            employeeDataFactory.serviceArray.push(response.data);
            
            $scope.category = "";
            $scope.description = "";
            $scope.duration = "";
            $scope.code = "";
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
            
            $location.path('/tyontekijan_palvelut_paavalikko').replace();
            
        },function(error){
            
            console.log('employeeAddServiceController/saveServiceClicked/waitPromise:fail');
            console.log(error.message);
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
        });
        
    }
});