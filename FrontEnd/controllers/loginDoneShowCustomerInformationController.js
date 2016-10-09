main_module.controller('loginDoneShowCustomerInformationController',function($scope,$location,customerDataFactory){
    
    console.log('loginDoneShowCustomerInformationController loaded');
    
    $scope.navbarData = {
        urls:['#/palvelun_valinta_sisaankirjauduttu',"#/palvelut_ja_hinnasto_sisaankirjauduttu",'#/yhteystiedot_sisaankirjauduttu'],
        texts:['Palvelun valinta','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['active','','']
    }
    
    $scope.customer = null;
    
    customerDataFactory.getCustomer(dataCallbackCustomer);
    
    function dataCallbackCustomer(dataArray){
        console.log('loginDoneReservationSelectServiceController/dataCallbackCustomer');
        
        $scope.customer = dataArray[0];
    }
    
    $scope.changePasswordClicked = function(){
        console.log('loginDoneReservationSelectServiceController/changePasswordClicked');
    }
    
    $scope.changeInformationClicked = function(){
        console.log('loginDoneReservationSelectServiceController/changeInformationClicked');
        
        $location.path('/asiakas_muokkaa_tietoja_sisaankirjauduttu').replace();
    }
    
});