main_module.controller('loginDoneContactDetailsController',function($scope,companyDataFactory){
    
    console.log('loginDoneContactDetailsController loaded');
    
    $scope.navbarData = {
        
        urls:['#/palvelun_valinta_sisaankirjauduttu','#/palvelut_ja_hinnasto_sisaankirjauduttu','#/yhteystiedot_sisaankirjauduttu'],
        texts:['Palvelun valinta','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['','','active']
    }
    
    $scope.companyData = [];
    
    companyDataFactory.getInformation(dataCallbackCompany);
    
    function dataCallbackCompany(dataArray){
    
        console.log('loginDoneContactDetailsController/dataCallbackCompany');
        //console.log("dataArray[0]");
        //console.log(dataArray[0]);
    
        $scope.companyData = dataArray;
    }
    
});