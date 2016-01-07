main_module.controller('addServiceController',function($scope,serviceDataFactory,Flash){
    
    console.log('addServiceController loaded');
    
    //Funktiototeutus Save-nappulan painallukselle partial_addServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveService').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Employee määrittelyssä database.js:ssä
        var temp = {
            category:$scope.category,
            description:$scope.description,
            timeInMinutes:$scope.timelength,
            code:$scope.code
        };
        
        var waitPromise = serviceDataFactory.insertData(temp);
        
        waitPromise.then(function(response){
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
            
            Flash.create('warning', 'Palvelun lisäys epäonnistui!', 'custom-class');
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
        });
    }
});