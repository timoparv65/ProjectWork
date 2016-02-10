main_module.controller('serviceAddController',function($scope,serviceDataFactory,$location){
    
    console.log('serviceAddController loaded');
    
    //Funktiototeutus Save-nappulan painallukselle partial_addServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        
        console.log('serviceAddController/saveServiceClicked');
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveService').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Employee määrittelyssä database.js:ssä
        var temp = {
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
        
        var waitPromise = serviceDataFactory.insertData(temp);
        
        waitPromise.then(function(response){
            
            console.log('serviceAddController/saveServiceClicked/waitPromise:success');
            console.log(response.data);
            
            
            // queries.js/exports.saveNewService: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se serviceArray:hyn
            serviceDataFactory.serviceArray.push(response.data);
            
            $scope.category = "";
            $scope.description = "";
            $scope.duration = "";
            $scope.code = "";
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
            
            $location.path('/palvelut_paavalikko').replace();
            
        },function(error){
            
            console.log('serviceAddController/saveServiceClicked/waitPromise:fail');
            console.log(error.message);
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
        });
        
    }
});