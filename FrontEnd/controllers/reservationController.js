main_module.controller('reservationController',function($scope,$location,employeeDataFactory){
    
    console.log('reservationController loaded');
    
    $scope.employeeData = [];
    $scope.selectedEmployee = [];
    $scope.serviceChoiseData = [];

    $scope.navbarData = {
        
        urls:['#/','#/ajanvaraus',"#/palvelut_ja_hinnasto",'#/yhteystiedot'],
        texts:['Etusivu','Ajanvaraus','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['','active','','']
    }
    
    employeeDataFactory.getServiceChoises(dataCallBack2);
    
    employeeDataFactory.getEmployees(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('reservationController/dataCallback');
    
        $scope.employeeData = dataArray;
        console.log('dataArray');
        console.log(dataArray);
        
        var temp = {
            name: 'Kuka tahansa',
            email:'kukatahansa@tukkapolly.fi',
        }
        
        $scope.selectedEmployee.push(temp);
        for(var i = 0; i < dataArray.length; i++)
        {
            var empl = dataArray[i];
            var temp = {
                name: empl.name,
                email: empl.email
            }
            
            $scope.selectedEmployee.push(temp);
        }
        // This one preselected
        $scope.selectedEmpl = $scope.selectedEmployee[0];
        
    }
    
    $scope.selectServiceClicked = function(){
        console.log('reservationController/selectServiceClicked');
        
        console.log('$scope.selectedEmpl');
        console.log($scope.selectedEmpl.name);
        console.log('$scope.selectedServ.description');
        console.log($scope.selectedServ.description);
        
        $location.path('/ajanvaraus_ajan_valinta').replace();
        
    }
    
    $scope.selectServicesByEmployee = function(){
        console.log('reservationController/selectServicesByEmployee');
        
        if ($scope.selectedEmpl.name === 'Kuka tahansa'){
            employeeDataFactory.getServiceChoises(dataCallBack2);
        } else {
            console.log('$scope.selectedEmpl.name');
            console.log($scope.selectedEmpl.name);
            employeeDataFactory.selectedEmployee = $scope.selectedEmpl;
            employeeDataFactory.getServices(dataCallBack2);
        }
    }
    
    function dataCallBack2(dataArray){
        console.log('reservationController/dataCallBack2');
        
        $scope.serviceChoiseData = dataArray;
        $scope.selectedServ = dataArray[0];
    }

});