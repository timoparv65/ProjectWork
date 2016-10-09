main_module.controller('loginDoneShowCustomerReservationsController',function($scope,customerDataFactory){
    
    console.log('loginDoneShowCustomerReservationsController loaded');
    
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
});