main_module.controller('employeeAddServiceController',function($scope,employeeDataFactory,$location,Flash){
    
    console.log('employeeAddServiceController loaded');
    
    $scope.serviceChoiseData = [];
    
    $scope.navbarData = {
        
        urls:[],
        texts:[],
        classes:[]
    }
    
    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log('selectedEmployee:');
    console.log($scope.selectedEmployee);
    
    employeeDataFactory.getServiceChoises(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('employeeAddServiceController/dataCallback');
        console.log(dataArray);
    
        $scope.serviceChoiseData = dataArray;
        
    }
    
    //Funktiototeutus Save-nappulan painallukselle partial_addServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        
        console.log('employeeAddServiceController/saveServiceClicked');
        
        var value = $scope.selected;
        console.log(value);
        
        employeeDataFactory.selected_service_choise_id = value;
        var serviceChoise = employeeDataFactory.getSelectedServiceChoise();
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveService').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Employee määrittelyssä database.js:ssä
        var temp = {
            name:$scope.selectedEmployee.name,
            category:serviceChoise.category,
            description:serviceChoise.description,
            duration:serviceChoise.duration,
            code:serviceChoise.code
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
            
            Flash.create('success', 'Lisätty uusi palvelu työntekijälle', 'custom-class');
            
            $scope.category = "";
            $scope.description = "";
            $scope.duration = "";
            $scope.code = "";
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
            
            //$location.path('/tyontekijan_palvelut_paavalikko').replace();
            
        },function(error){
            
            console.log('employeeAddServiceController/saveServiceClicked/waitPromise:fail');
            console.log(error.message);
            
            Flash.create('warning', 'Palvelun lisäys työntekijälle epäonnistui!', 'custom-class');
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
        });
        
    }
});