main_module.controller('loginDoneReservationController',function($scope,customerDataFactory){
    
    console.log('loginDoneReservationController loaded');

    $scope.navbarData = {
        
        urls:['#/','#/ajanvaraus',"#/palvelut_ja_hinnasto",'#/yhteystiedot'],
        texts:['Etusivu','Ajanvaraus','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['','active','','']
    }
    
    //$scope.customer = customerDataFactory.getCustomer();
    
    $scope.selectServiceClicked = function(){
        console.log('loginDoneReservationController/selectServiceClicked');
        
        
    }

});