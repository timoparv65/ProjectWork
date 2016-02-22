main_module.controller('serviceAddController',function($scope,employeeDataFactory,$location,Flash){
    
    console.log('serviceAddController loaded');
    
    $scope.navbarData = {
        
        urls:['/logout','#/sovelluksen_hallinnointi_paasivu','#/palvelut_paavalikko','#/palvelu_lisaa'],
        texts:['Poistu','Hallinnointi pääsivu','Palvelut','Lisää palvelu'],
        classes:['','','','active']
    }
    
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
        
        var waitPromise = employeeDataFactory.insertServiceChoiseData(temp);
        
        waitPromise.then(function(response){
            
            console.log('serviceAddController/saveServiceClicked/waitPromise:success');
            console.log(response.data);
            
            
            // queries.js/exports.saveNewService: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se serviceChoiseArray:hyn
            employeeDataFactory.serviceChoiseArray.push(response.data);
            
            $scope.category = "";
            $scope.description = "";
            $scope.duration = "";
            $scope.code = "";
            
            Flash.create('success', 'Palvelu lisättiin onnistuneesti!', 'custom-class');
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
            
            //$location.path('/palvelut_paavalikko').replace();
            
        },function(error){
            
            console.log('serviceAddController/saveServiceClicked/waitPromise:fail');
            console.log(error.message);
            
            Flash.create('danger','Palvelun lisäys epäonnistui. Koodi oli jo käytössä!', 'custom-class');
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
        });
        
    }
});