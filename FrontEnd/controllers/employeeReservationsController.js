main_module.controller('employeeReservationsController',function($scope,employeeDataFactory){
    
    console.log('employeeReservationsController loaded');
    
    $scope.navbarData = {
        
        urls:['/logout','#/sovelluksen_hallinnointi_login'],
        texts:['Poistu','Palveluiden ja työntekijöiden hallinnoiti'],
        classes:['','','']
    }
    
    //employeeDataFactory.init;
    employeeDataFactory.getEmployees(dataCallback);
    
    
    function dataCallback(dataArray){
    
        console.log('employeeReservationsController/dataCallback');
        console.log(dataArray);
    
        $scope.employeeData = dataArray;
    }
    
});
