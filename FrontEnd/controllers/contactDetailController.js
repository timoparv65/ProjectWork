main_module.controller('contactDetailController',function($scope,companyDataFactory){
    
    console.log('contactDetailController loaded');
    
    $scope.navbarData = {
        
        urls:['#/','#/ajanvaraus',"#/palvelut_ja_hinnasto",'#/yhteystiedot'],
        texts:['Etusivu','Ajanvaraus','Palvelut ja hinnasto','Yhteystiedot'],
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