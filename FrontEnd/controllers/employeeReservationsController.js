main_module.controller('employeeReservationsController',function($scope,employeeDataFactory,employeeLoginFactory){
    
    console.log('employeeReservationsController loaded');
    
    $scope.employeeData = [];
    
    $scope.navbarData = {
        
        urls:['/logout','#/sovelluksen_hallinnointi_login'],
        texts:['Poistu','Sovelluksen hallinnointi'],
        classes:['','','']
    }
    
    employeeLoginFactory.resetSessionAdminId();
    
    employeeDataFactory.getAll(dataCallback);
    
    
    function dataCallback(dataArray){
    
        console.log('employeeReservationsController/dataCallback');
        console.log(dataArray);
    
        $scope.employeeData = dataArray;
    }
    
});
