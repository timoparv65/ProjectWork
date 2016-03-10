main_module.controller('employeeListFunctionsController',function($scope,employeeDataFactory,$location){

    console.log('employeeListFunctionsController loaded');
    
    $scope.navbarData = {
        
        urls:['/logout','#/tyontekija_paavalikko','#/tyontekija_muokkaa_poista'],
        texts:['Poistu','Työntekijä','Muokkaa tai poista työntekijä'],
        classes:['','','']
    }

    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log('$scope.selectedEmployee');
    console.log($scope.selectedEmployee);
    
});