main_module.controller('employeeServiceMainController',function($scope,employeeDataFactory,serviceDataFactory,Flash,$location){
    
    console.log('employeeServiceMainController loaded');
    
    $scope.serviceData = [];
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko','#/tyontekijan_palvelut_paavalikko','#/tyontekija_lisaa_palvelu','#/tyontekija_poista_palvelu'],
        texts:['Poistu','Työntekijä','Palvelut','Lisää palvelu','Poista palvelu'],
        classes:['','','active','','']
    }
    
    $scope.selectedEmployee = employeeDataFactory.getSelected();
    
    serviceDataFactory.getAll(employeeDataFactory.selected, dataCallback);
    
    
    function dataCallback(dataArray){
    
        console.log('employeeServiceMainController/dataCallback');
        console.log(dataArray);
        
        $scope.serviceData = dataArray;
    }
    
});