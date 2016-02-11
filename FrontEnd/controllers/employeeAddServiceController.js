main_module.controller('employeeAddServiceController',function($scope,employeeDataFactory,serviceDataFactory,$location){

    console.log('employeeAddServiceController loaded');
    
    //var selectedEmployee = employeeDataFactory.getSelectedEmployee();
    //console.log('selectedEmployee:');
    //console.log(selectedEmployee);
    
    serviceDataFactory.getServices(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('employeeAddServiceController/dataCallback');
        console.log(dataArray);
    
        $scope.serviceChoiseData = dataArray;
        
    }
    
    //Funktiototeutus Save-nappulan painallukselle partial_employeeAddServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        
        console.log('employeeAddServiceController/saveServiceClicked');
        var value = $scope.selected;
        console.log(value);
        
    }
    
});