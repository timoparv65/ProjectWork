main_module.controller('contactDetailsController',function($scope,companyDataFactory){
    
    console.log('contactDetailsController loaded');
    
    $scope.navbarData = {
        
        urls:['#/','#/palvelun_valinta',"#/palvelut_ja_hinnasto",'#/yhteystiedot'],
        texts:['Etusivu','Palvelun valinta','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['','','','active']
    }
    
    $scope.companyData = [];
    
    companyDataFactory.getInformation(dataCallbackCompany);
    
    function dataCallbackCompany(dataArray){
    
        console.log('contactDetailsController/dataCallbackCompany');
        //console.log("dataArray[0]");
        //console.log(dataArray[0]);
    
        $scope.companyData = dataArray;
    }
    
});