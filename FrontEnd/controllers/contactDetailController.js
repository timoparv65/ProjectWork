main_module.controller('contactDetailController',function($scope,companyDataFactory){
    
    console.log('contactDetailController loaded');
    
    $scope.navbarData = {
        
        urls:['#/','#/palvelun_valinta',"#/palvelut_ja_hinnasto",'#/yhteystiedot'],
        texts:['Etusivu','Palvelun valinta','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['','','','active']
    }
    
    $scope.companyData = [];
    
    companyDataFactory.getCompanyInformation(dataCallbackCompany);
    
    function dataCallbackCompany(dataArray){
    
        console.log('contactDetailController/dataCallbackCompany');
        //console.log("dataArray[0]");
        //console.log(dataArray[0]);
    
        $scope.companyData = dataArray;
    }
    
});