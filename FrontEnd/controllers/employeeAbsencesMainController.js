main_module.controller('employeeAbsencesMainController',function($scope){

    console.log('employeeAbsencesMainController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko','#/tyontekijan_poissaolot_paavalikko'],
        texts:['Poistu','Työntekijä','Poissaolot'],
        classes:['','','active']
    }

    
});