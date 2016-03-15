main_module.controller('companyDeleteEditController',function($scope,companyDataFactory,$location,Flash){
    
    
    console.log('companyDeleteEditController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/yritys_paavalikko','#/yritys_muokkaa_poista'],
        texts:['Poistu','Yritys','Muokkaa/poista'],
        classes:['','','active']
    }
    
    $scope.deleteArray = [];
    
    $scope.selectedCompany = companyDataFactory.getSelectedCompany();
    console.log($scope.selectedCompany);
    
    $scope.id = $scope.selectedCompany._id;
    $scope.name = $scope.selectedCompany.name;
    $scope.address = $scope.selectedCompany.address;
    $scope.postalcode = $scope.selectedCompany.postalCode;
    $scope.city = $scope.selectedCompany.city;
    $scope.country = $scope.selectedCompany.country;
    $scope.phonenumber = $scope.selectedCompany.phoneNumber;
    $scope.openingtime = $scope.selectedCompany.openingTime;
    $scope.closingtime = $scope.selectedCompany.closingTime;
    $scope.timeraster = $scope.selectedCompany.timeRaster;
    
    $scope.saveCompanyClicked = function(){
        
        console.log('companyDeleteEditController/saveCompanyClicked');
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveCompany').attr("disabled", true);
        
        var temp = {
            id:$scope.id,
            name:$scope.name,
            address:$scope.address,
            postalCode:$scope.postalcode,
            city:$scope.city,
            country:$scope.country,
            phoneNumber:$scope.phonenumber,
            openingTime:$scope.openingtime,
            closingTime:$scope.closingtime,
            timeRaster:$scope.timeraster
        }
        
        console.log(temp);
        
        companyDataFactory.updateData(temp).then(success,error);
        
    }
    
    function success(){
        
        console.log('companyDeleteEditController/success');
        
        companyDataFactory.companyArray = [];
        $scope.name = "";
        $scope.address = "";
        $scope.postalcode = "";
        $scope.city = "";
        $scope.country = "";
        $scope.phonenumber = "";
        $scope.openingtime = "";
        $scope.closingtime = "";
        $scope.timeraster = "";
        
        Flash.create('success', 'Yrityksen tietoja muokattu onnistuneesti!', 'custom-class');
        
        // sallitaan Save-napin painaminen
        $('#saveCompany').attr("disabled", false);
        //$location.path('yritys_paavalikko').replace();
    }
    
    function error(data){
        
        console.log('companyDeleteEditController/error');
        
        Flash.create('danger','Yrityksen tietojen muokkaus epäonnistui', 'custom-class');
        
        // sallitaan Save-napin painaminen
        $('#saveEmployee').attr("disabled", false);
    }
    
    
    $scope.deleteCompanyClicked = function(){
        
        console.log('companyDeleteEditController/deleteCompanyClicked');
        
        // estetään Delete-napin painaminen sillä välin kun tiedot poistetaan tietokannasta
        $('#deleteCompany').attr("disabled", true);
        
        //Add the id to our delete array
        var id = $scope.id;
        console.log(id);
        $scope.deleteArray.push(id);
        
        //Nothing to delete
        if($scope.deleteArray.length === 0){
            
            Flash.create('danger','Ei mitään poistettavaa yritystä!', 'custom-class');
            console.log('nothing to delete');
            
            // sallitaan Delete-napin painaminen
            $('#deleteCompany').attr("disabled", false);
        }
        else{
            
            var data = {
                
                forDelete:$scope.deleteArray
            }
            console.log(data);
            
            companyDataFactory.deleteData(data).then(function(data){

                companyDataFactory.companyArray = [];
                $location.path('/yritys_paavalikko').replace();
                
            },function(error){
                
                Flash.create('danger','Yrityksen tietojen poisto epäonnistui!', 'custom-class'); 
                console.log('error in server');
                
                // sallitaan Delete-napin painaminen
                $('#deleteCompany').attr("disabled", false);
            });
        }
        
    }
    
    
});