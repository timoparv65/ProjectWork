main_module.controller('loginDoneReservationController',function($scope,$location,customerDataFactory,employeeDataFactory){
    
    console.log('loginDoneReservationController loaded');

    $scope.employeeData = [];
    $scope.selectedEmployee = [];
    $scope.serviceChoiseData = [];
    
    $scope.navbarData = {
        
        urls:['#/','#/ajanvaraus',"#/palvelut_ja_hinnasto",'#/yhteystiedot'],
        texts:['Etusivu','Ajanvaraus','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['','active','','']
    }
    
    //$scope.customer = customerDataFactory.getCustomer();
    
    employeeDataFactory.getServiceChoises(dataCallBackServices);
    
    employeeDataFactory.getEmployees(dataCallback);
    
    $scope.selectServiceClicked = function(){
        console.log('loginDoneReservationController/selectServiceClicked');
        
        employeeDataFactory.selectedService = $scope.selectedServ;
        
        $location.path('/ajanvaraus_sisaankirjauduttu_ajan_valinta').replace();
    }
    
    function dataCallback(dataArray){
        console.log('loginDoneReservationController/dataCallback');
    
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
    
    function dataCallBackServices(dataArray){
        console.log('loginDoneReservationController/dataCallBackServices');
        
        $scope.serviceChoiseData = dataArray;
        $scope.selectedServ = dataArray[0];
    }

});