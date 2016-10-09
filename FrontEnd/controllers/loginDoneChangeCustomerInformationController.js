main_module.controller('loginDoneChangeCustomerInformationController',function($scope,customerDataFactory){
    
    console.log('loginDoneChangeCustomerInformationController loaded');
    
    $scope.phonenumber = null;
    $scope.emailaddress = null;
    $scope.customer = null;
    
    $scope.navbarData = {
        urls:['#/palvelun_valinta_sisaankirjauduttu',"#/palvelut_ja_hinnasto_sisaankirjauduttu",'#/yhteystiedot_sisaankirjauduttu'],
        texts:['Palvelun valinta','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['active','','']
    }
    
    customerDataFactory.getCustomer(dataCallbackCustomer);
    
    function dataCallbackCustomer(dataArray){
        console.log('loginDoneChangeCustomerInformationController/dataCallbackCustomer');
        
        $scope.customer = dataArray[0];
        $scope.phonenumber = $scope.customer.mobileNumber;
        $scope.emailaddress = $scope.customer.email;
    }
    
});