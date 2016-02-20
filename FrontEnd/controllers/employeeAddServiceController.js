main_module.controller('employeeAddServiceController',function($scope,employeeDataFactory,$location){

    console.log('employeeAddServiceController loaded');
    
    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log('selectedEmployee:');
    console.log($scope.selectedEmployee);
    
    employeeDataFactory.getServiceChoises(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('employeeAddServiceController/dataCallback');
        console.log(dataArray);
    
        $scope.serviceChoiseData = dataArray;
        
    }
    
    //Funktiototeutus Save-nappulan painallukselle partial_employeeAddServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        
        console.log('employeeAddServiceController/saveServiceClicked');
        var value = $scope.selected;
        console.log(value);
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveService').attr("disabled", true);
        
        // pitäisi tarkistaa että Comboboxin palauttama arvo ei ole undefines
        // => tehdään Java Scriptillä. Katso mallia aikaisemmista harjoituksista
        
        var temp = {
            name:$scope.selectedEmployee.name,
            code:value
        };
        
        var waitPromise = employeeDataFactory.insertServiceData(temp);
        
        waitPromise.then(function(response){
            
            console.log('employeeAddServiceController/saveServiceClicked/waitPromise:success');
            console.log(response.data);
            
            
            // queries.js/exports.saveNewService: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se serviceArray:hyn
            employeeDataFactory.serviceArray.push(response.data);
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
            
            //$location.path('/tyontekijan_palvelut_paavalikko').replace();
            
        },function(error){
            
            console.log('employeeAddServiceController/saveServiceClicked/waitPromise:fail');
            console.log(error.message);
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
        });

        
    }
    
});