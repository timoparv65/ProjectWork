main_module.controller('employeeReservationsController',function($scope,employeeDataFactory,employeeLoginFactory){
    
    console.log('employeeReservationsController loaded');
    
    $scope.navbarData = {
        
        urls:['/logout','#/sovelluksen_hallinnointi_login'],
        texts:['Poistu','Palveluiden ja työntekijöiden hallinnoiti'],
        classes:['','','']
    }
    
    employeeLoginFactory.resetSessionAdminId();
    
    employeeDataFactory.getEmployees(dataCallback);
    
    
    function dataCallback(dataArray){
    
        console.log('employeeReservationsController/dataCallback');
        console.log(dataArray);
    
        $scope.employeeData = dataArray;
    }
    
});
