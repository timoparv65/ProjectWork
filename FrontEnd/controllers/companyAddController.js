main_module.controller('companyAddController',function($scope,companyDataFactory,$location,Flash,$timeout){
    
    console.log('companyAddController loaded');
    
    $scope.companyData = [];
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/sovelluksen_hallinnointi_paasivu','#/yritys_paavalikko','#/yritys_lisaa'],
        texts:['Poistu','Hallinnointi pääsivu','Yritys','Lisää yrityksen tiedot'],
        classes:['','','','active']
    }
    
    
    companyDataFactory.getInformation(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('companyAddController/dataCallback');
        console.log(dataArray);
    
        $scope.companyData = dataArray;

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
            phoneNumber:$scope.phonenumber,
            openingTime:$scope.openingtime,
            closingTime:$scope.closingtime,
            timeRaster:$scope.timeraster
        };
        
        console.log(temp);
        
        if (temp.name.length === 0 ||
            temp.address.length === 0 ||
            temp.postalCode.length === 0 ||
            temp.city.length === 0 ||
            temp.country.length === 0 ||
            temp.phoneNumber.length === 0 ||
            temp.openingTime.length === 0 ||
            temp.closingTime.length === 0 ||
            temp.timeRaster.length === 0){
            
            alert('Jokin kenttä tyhjä!');
            return;
        }
        
        
        var waitPromise = companyDataFactory.insertData(temp);
        
        waitPromise.then(function(response){
            // queries.js/exports.saveNewCompany: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se array:hyn
            
            console.log('companyAddController/saveCompanyClicked/waitPromise:success');
            console.log(response.data);
            
            companyDataFactory.array.push(response.data);
            Flash.create('success', 'Uusi yritys lisätty', 'custom-class');
            
            $scope.name = "";
            $scope.address = "";
            $scope.postalcode = "";
            $scope.city = "";
            $scope.country = "";
            $scope.phonenumber = "";
            $scope.openingtime = "";
            $scope.closingtime = "";
            $scope.timeraster = "";
            
            // sallitaan Save-napin painaminen
            $('#saveCompany').attr("disabled", false);
            
            $timeout(function(){
                $location.path('/yritys_paavalikko').replace();
            }, 2000);
            
        },function(error){
            
            console.log('companyAddController/saveCompanyClicked/waitPromise:fail');
            console.log(error.message);
            
            Flash.create('warning', 'Yrityksen tietojen lisäys epäonnistui.', 'custom-class');
            // sallitaan Save-napin painaminen
            $('#saveCompany').attr("disabled", false);
            
            $timeout(function(){
                $location.path('/yritys_paavalikko').replace();
            }, 2000);
        });
        
    };
    
});