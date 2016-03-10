main_module.controller('employeeListFunctionsController',function($scope,employeeDataFactory,$location){

    console.log('employeeListFunctionsController loaded');
    
    $scope.navbarData = {
        
        urls:['/logout','#/tyontekija_paavalikko','#/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko','#/tyontekija_muokkaa_poista','#/tyontekijan_palvelut_paavalikko'],
        texts:['Poistu','Työntekijät','Työntekijä','Muokkaa/poista','Lisää/poista palvelu'],
        classes:['','','active','','']
    }

    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log('$scope.selectedEmployee');
    console.log($scope.selectedEmployee);
    
});