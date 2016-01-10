main_module.controller('addServiceController',function($scope,serviceDataFactory,Flash){
    
    console.log('addServiceController loaded');
    
    //Funktiototeutus Save-nappulan painallukselle partial_addServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        
        console.log('addServiceController/saveServiceClicked');
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveService').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Employee määrittelyssä database.js:ssä
        var temp = {
            name:'timppa',
            category:$scope.category,
            description:$scope.description,
            timeInMinutes:$scope.timelength,
            code:$scope.code
        };
        
        console.log(temp);
        
        if (temp.category.length === 0 ||
            temp.description.length === 0 ||
            temp.timeInMinutes.length === 0 ||
            temp.code.length === 0){
            
            alert('Jokin kenttä tyhjä!');
            return;
        }
        
        var waitPromise = serviceDataFactory.insertData(temp);
        
        waitPromise.then(function(response){
            
            console.log('addServiceController/saveServiceClicked/waitPromise:success');
            console.log(response.data);
            
            
            // queries.js/exports.saveNewService: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se serviceArray:hyn
            serviceDataFactory.serviceArray.push(response.data);
            Flash.create('success', 'Uusi palvelu lisätty', 'custom-class');
            
            $scope.category = "";
            $scope.description = "";
            $scope.timelength = "";
            $scope.code = "";
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
        },function(error){
            
            console.log('addServiceController/saveServiceClicked/waitPromise:fail');
            console.log(error.message);
            
            Flash.create('warning', 'Palvelun lisäys epäonnistui!', 'custom-class');
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
        });
        
        //location.path('/lisaa_tyontekija_paavalikko').replace();
    }
});