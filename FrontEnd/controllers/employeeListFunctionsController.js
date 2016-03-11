main_module.controller('employeeListFunctionsController',function($scope,employeeDataFactory,$location){

    // /tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko
    
    console.log('employeeListFunctionsController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/tyontekija_paavalikko','#/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko','#/tyontekija_muokkaa_poista','#/tyontekijan_palvelut_paavalikko','#/tyontekijan_varaukset_paavalikko','#/tyontekijan_poissaolot_paavalikko'],
        texts:['Poistu','Työntekijät','Työntekijä','Muokkaa/poista','Palvelut','Varaukset','Poissaolot'],
        classes:['','','active','','','','']
    }

    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log('$scope.selectedEmployee');
    console.log($scope.selectedEmployee);
    
});