main_module.controller('reservationSelectServiceController',function($scope,$location,employeeDataFactory){
    
    console.log('reservationSelectServiceController loaded');
    
    $scope.employeeData = [];
    $scope.selectedEmployee = [];
    $scope.serviceChoiseData = [];

    $scope.navbarData = {
        
        urls:['#/','#/ajanvaraus',"#/palvelut_ja_hinnasto",'#/yhteystiedot'],
        texts:['Etusivu','Ajanvaraus','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['','active','','']
    }
    
    employeeDataFactory.getServiceChoises(dataCallBackServices);
    
    function dataCallBackServices(dataArray){
        console.log('reservationSelectServiceController/dataCallBackServices');
        
        $scope.serviceChoiseData = dataArray;
        $scope.selectedServ = dataArray[0];
    }
    
    employeeDataFactory.getEmployees(dataCallback);
    
    function dataCallback(dataArray){
        console.log('reservationSelectServiceController/dataCallback');
    
        $scope.employeeData = dataArray;
        //console.log('dataArray');
        //console.log(dataArray);
        
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
        employeeDataFactory.selectedEmployee = $scope.selectedEmpl;
    }
    
    $scope.selectServiceClicked = function(){
        console.log('reservationSelectServiceController/selectServiceClicked');
        
        //console.log('$scope.selectedEmpl');
        //console.log($scope.selectedEmpl.name);
        console.log('$scope.selectedServ');
        console.log($scope.selectedServ);
        
        employeeDataFactory.selectedService = $scope.selectedServ;
        
        $location.path('/ajanvaraus_ajan_valinta').replace();
        
    }
    
    $scope.selectServicesByEmployee = function(){
        console.log('reservationSelectServiceController/selectServicesByEmployee');
        
        console.log('$scope.selectedEmpl');
        console.log($scope.selectedEmpl);
        
        employeeDataFactory.selectedEmployee = $scope.selectedEmpl;
        
        if ($scope.selectedEmpl.name === 'Kuka tahansa'){
            employeeDataFactory.getServiceChoises(dataCallBackServices);
        } else {
            //console.log('$scope.selectedEmpl.name');
            //console.log($scope.selectedEmpl.name);
            employeeDataFactory.getServices(dataCallBackServices);
        }
    }

    $scope.submit = function(){
        console.log('reservationSelectServiceController/submit');
        
        console.log('username: ' + $scope.username);
        console.log('passwd: ' + $scope.passwd);
    }

});