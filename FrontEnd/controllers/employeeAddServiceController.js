main_module.controller('employeeAddServiceController',function($scope,employeeDataFactory,serviceDataFactory,serviceChoiseDataFactory,$location,Flash,$timeout){
    
    console.log('employeeAddServiceController loaded');
    
    $scope.serviceChoiseData = [];
    $scope.message = "";
    $scope.selected = null;
    $scope.selectedEmployee = null;
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/tyontekijan_palvelut_paavalikko','#/tyontekija_lisaa_palvelu'],
        texts:['Poistu','Palvelut','Lisää palvelu'],
        classes:['','','active']
    }
    
    $scope.selectedEmployee = employeeDataFactory.getSelected();
    console.log('selectedEmployee:');
    console.log($scope.selectedEmployee);
    
    serviceChoiseDataFactory.getAll(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('employeeAddServiceController/dataCallback');
        console.log(dataArray);
    
        $scope.serviceChoiseData = dataArray;
        $scope.selected = dataArray[0];
    }
    
    
    //Funktiototeutus Save-nappulan painallukselle partial_employeeAddServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        console.log('employeeAddServiceController/saveServiceClicked');
        
        //console.log("$scope.selected");
        //console.log($scope.selected);
        
        if ($scope.selected == null){
            $scope.message = "Valitse palvelu";
        } else {
            // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
            $('#saveService').attr("disabled", true);
            
            console.log('$scope.selected._id');
            console.log($scope.selected._id);
            
            var temp = {
                name:$scope.selectedEmployee.name,
                id:$scope.selected._id
            };
            
            var waitPromise = serviceDataFactory.insertData(temp);

            waitPromise.then(function(response){

                console.log('employeeAddServiceController/saveServiceClicked/waitPromise:success');
                console.log(response.data);


                // queries.js/exports.saveNewService: palauttaa data nimisen muuttujan responsessa.
                // Talletetaan se serviceDataFactory.array:hyn
                //serviceDataFactory.array.push(response.data);

                Flash.create('success', 'Lisätty uusi palvelu työntekijälle', 'custom-class');

                $scope.selected = $scope.serviceChoiseData[0];

                // sallitaan Save-napin painaminen
                $('#saveService').attr("disabled", false);

                $timeout(function(){
                    $location.path('/tyontekijan_palvelut_paavalikko').replace();
                }, 2000);

            },function(error){

                console.log('employeeAddServiceController/saveServiceClicked/waitPromise:fail');
                console.log(error.message);

                Flash.create('warning', 'Palvelun lisäys työntekijälle epäonnistui!', 'custom-class');

                // sallitaan Save-napin painaminen
                $('#saveService').attr("disabled", false);
                
                $timeout(function(){
                    $location.path('/tyontekijan_palvelut_paavalikko').replace();
                }, 2000);
            });
        }
        
    }
    
    $scope.updateMessage = function(){
        console.log('employeeAddServiceController/updateMessage');
        
        $scope.message = "";
    }
});