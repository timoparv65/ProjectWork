main_module.controller('employeeReservationsMainController',function($scope){

    console.log('employeeReservationsMainController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko','#/tyontekijan_varaukset_paavalikko'],
        texts:['Poistu','Työntekijä','Varaukset'],
        classes:['','','active']
    }

    
});