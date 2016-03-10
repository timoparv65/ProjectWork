main_module.controller('employeeDataController',function($scope,employeeDataFactory,$location){
    
    console.log('employeeDataController loaded');
    
    $scope.employeeData = [];
    
    $scope.navbarData = {
        
        urls:['/logout','#/sovelluksen_hallinnointi_paasivu','#/tyontekija_paavalikko','#/tyontekija_lisaa'],
        texts:['Poistu','Hallinnointi pääsivu','Työntekijät','Lisää työntekijä'],
        classes:['','','active','']
    }
    
    employeeDataFactory.getEmployees(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('employeeDataController/dataCallback');
        console.log(dataArray);
    
        $scope.employeeData = dataArray;
        
    }
    
    $scope.rowClicked = function(id){
        
        console.log('employeeDataController/rowClicked');
        
        employeeDataFactory.selected_id = id;
        console.log('employeeDataFactory.selected_id: ' + employeeDataFactory.selected_id);
        //$location.path('/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko').replace();
        $location.path('/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko');
    }
    
});