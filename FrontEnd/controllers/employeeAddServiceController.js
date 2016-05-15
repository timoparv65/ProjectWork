main_module.controller('employeeAddServiceController',function($scope,employeeDataFactory,$location,Flash,$timeout){
    
    console.log('employeeAddServiceController loaded');
    
    $scope.serviceChoiseData = [];
    $scope.message = "";
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/tyontekijan_palvelut_paavalikko','#/tyontekija_lisaa_palvelu'],
        texts:['Poistu','Palvelut','Lisää palvelu'],
        classes:['','','active']
    }
    
    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log('selectedEmployee:');
    console.log($scope.selectedEmployee);
    
    employeeDataFactory.getServiceChoises(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('employeeAddServiceController/dataCallback');
        console.log(dataArray);
    
        $scope.serviceChoiseData = dataArray;
        $scope.selected = dataArray[0];
    }
    
    
    //Funktiototeutus Save-nappulan painallukselle partial_addServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        console.log('employeeAddServiceController/saveServiceClicked');
        
        //console.log("$scope.selected");
        //console.log($scope.selected);
        
        if ($scope.selected == null){
            $scope.message = "Valitse palvelu";
        } else {
            // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
            $('#saveService').attr("disabled", true);

            // temp muuttujien nimet oltava samat kuin Employee määrittelyssä database.js:ssä
            var temp = {
                name:$scope.selectedEmployee.name,
                category:$scope.selected.category,
                categoryextrainfo:$scope.selected.categoryextrainfo,
                description:$scope.selected.description,
                extrainfo:$scope.selected.extrainfo,
                duration:$scope.selected.duration,
                price:$scope.selected.price
            };

            //console.log(temp);

            if (temp.category.length === 0 ||
                temp.name.length === 0){

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

                $scope.selected = $scope.serviceChoiseData[0];

                // sallitaan Save-napin painaminen
                $('#saveService').attr("disabled", false);

                $timeout(function(){
                    $location.path('/tyontekijan_palvelut_paavalikko').replace();
                }, 4000);

            },function(error){

                console.log('employeeAddServiceController/saveServiceClicked/waitPromise:fail');
                console.log(error.message);

                Flash.create('warning', 'Palvelun lisäys työntekijälle epäonnistui!', 'custom-class');

                // sallitaan Save-napin painaminen
                $('#saveService').attr("disabled", false);
            });
        }
        
    }
    
    $scope.updateMessage = function(){
        console.log('employeeAddServiceController/updateMessage');
        
        $scope.message = "";
    }
});