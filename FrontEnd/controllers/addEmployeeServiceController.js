main_module.controller('addEmployeeServiceController',function($scope,employeeDataFactory,Flash,$location){
    
    console.log('addEmployeeServiceController loaded');
    
    var selectedEmployee = employeeDataFactory.getSelectedEmployee();
    //console.log('selectedEmployee');
    //console.log(selectedEmployee);
    
    //Funktiototeutus Save-nappulan painallukselle partial_addServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        
        console.log('addEmployeeServiceController/saveServiceClicked');
        console.log('selectedEmployee:' + selectedEmployee);
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveService').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Employee määrittelyssä database.js:ssä
        var temp = {
            name:selectedEmployee.name,
            category:$scope.category,
            description:$scope.description,
            timeInMinutes:$scope.timelength,
            code:$scope.code
        };
        
        //console.log(temp);
        
        if (temp.category.length === 0 ||
            temp.description.length === 0 ||
            temp.timeInMinutes.length === 0 ||
            temp.code.length === 0){
            
            alert('Jokin kenttä tyhjä!');
            return;
        }
        
        var waitPromise = employeeDataFactory.insertServiceData(temp);
        
        waitPromise.then(function(response){
            
            console.log('addEmployeeServiceController/saveServiceClicked/waitPromise:success');
            //console.log(response.data);
            
            
            // queries.js/exports.saveNewService: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se serviceArray:hyn
            employeeDataFactory.serviceArray.push(response.data);
            Flash.create('success', 'Uusi palvelu lisätty', 'custom-class');
            
            $scope.category = "";
            $scope.description = "";
            $scope.timelength = "";
            $scope.code = "";
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
            
            $location.path('/tyontekijan_palvelut_paavalikko').replace();
            
        },function(error){
            
            console.log('addEmployeeServiceController/saveServiceClicked/waitPromise:fail');
            //console.log(error.message);
            
            Flash.create('warning', 'Palvelun lisäys epäonnistui!', 'custom-class');
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
        });
        
    }
});