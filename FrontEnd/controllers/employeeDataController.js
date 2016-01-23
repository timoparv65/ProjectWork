main_module.controller('employeeDataController',function($scope,employeeDataFactory,$location){
    
    console.log('employeeDataController loaded');
    
    employeeDataFactory.getEmployees(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('employeeDataController/dataCallback');
    
        $scope.employeeData = dataArray;
        
        //console.log($scope.employeeData);
    }
    
    $scope.rowClicked = function(id){
        
        console.log('employeeDataController/rowClicked');
        
        employeeDataFactory.selected_id = id;
        console.log('employeeDataFactory.selected_id: ' + employeeDataFactory.selected_id);
        
        $location.path('/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko').replace();
    }
    
});