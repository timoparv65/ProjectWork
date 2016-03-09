main_module.controller('companyAddController',function($scope,companyDataFactory,$location,Flash){
    
    console.log('companyAddController loaded');
    
    $scope.navbarData = {
        
        urls:['/logout','#/sovelluksen_hallinnointi_paasivu','#/yritys_paavalikko','#/yritys_lisaa'],
        texts:['Poistu','Hallinnointi pääsivu','Yritys','Lisää yrityksen tiedot'],
        classes:['','','','active']
    }
    
    
    //Funktiototeutus Save-nappulan painallukselle partial_companyAddView.html ikkunassa
    $scope.saveCompanyClicked = function(){
        console.log('companyAddController/saveCompanyClicked');
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveCompany').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Company määrittelyssä database.js:ssä
        var temp = {
            name:$scope.name,
            address:$scope.address,
            postalCode:$scope.postalcode,
            city:$scope.city,
            country:$scope.country,
            phoneNumber:$scope.phonenumber
        };
        
        console.log(temp);
        
        if (temp.name.length === 0 ||
            temp.address.length === 0 ||
            temp.postalCode.length === 0 ||
            temp.city.length === 0 ||
            temp.country.length === 0 ||
            temp.phoneNumber.length === 0){
            
            alert('Jokin kenttä tyhjä!');
            return;
        }
        
        
        var waitPromise = companyDataFactory.insertData(temp);
        
        waitPromise.then(function(response){
            // queries.js/exports.saveNewCompany: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se companyArray:hyn
            
            console.log('companyAddController/saveCompanyClicked/waitPromise:success');
            console.log(response.data);
            
            companyDataFactory.companyArray.push(response.data);
            Flash.create('success', 'Uusi yritys lisätty', 'custom-class');
            
            $scope.name = "";
            $scope.address = "";
            $scope.postalcode = "";
            $scope.city = "";
            $scope.country = "";
            $scope.phonenumber = "";
            
            // sallitaan Save-napin painaminen
            $('#saveCompany').attr("disabled", false);
            
            //$location.path('/tyontekija_paavalikko').replace();
        },function(error){
            
            console.log('companyAddController/saveCompanyClicked/waitPromise:fail');
            console.log(error.message);
            
            Flash.create('warning', 'Yrityksen tietojen lisäys epäonnistui.', 'custom-class');
            // sallitaan Save-napin painaminen
            $('#saveCompany').attr("disabled", false);
        });
        
    };
    
});