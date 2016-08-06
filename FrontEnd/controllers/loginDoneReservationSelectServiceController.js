main_module.controller('loginDoneReservationSelectServiceController',function($scope,$location,customerDataFactory,employeeDataFactory,serviceChoiseDataFactory,serviceDataFactory){
    
    console.log('loginDoneReservationSelectServiceController loaded');

    $scope.employeeData = [];
    $scope.selectedEmployee = [];
    $scope.serviceChoiseData = [];
    $scope.selectedServ = null;
    $scope.selectedEmpl = null;
    
    $scope.navbarData = {
        
        urls:['#/palvelun_valinta_sisaankirjauduttu',"#/palvelut_ja_hinnasto_sisaankirjauduttu",'#/yhteystiedot_sisaankirjauduttu'],
        texts:['Palvelun valinta','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['active','','']
    }
    
    serviceChoiseDataFactory.getAll(dataCallBackServices);
    
    function dataCallBackServices(dataArray){
        console.log('loginDoneReservationSelectServiceController/dataCallBackServices');
        
        $scope.serviceChoiseData = dataArray;
        $scope.selectedServ = dataArray[0];
    }
    
    employeeDataFactory.getEmployees(dataCallback);
    
    function dataCallback(dataArray){
        console.log('loginDoneReservationSelectServiceController/dataCallback');
    
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
    
    // kun painetaan "seuraava"-nappia
    $scope.selectServiceClicked = function(){
        console.log('loginDoneReservationSelectServiceController/selectServiceClicked');
        
        console.log('$scope.selectedServ');
        console.log($scope.selectedServ);
        
        //employeeDataFactory.selectedService = $scope.selectedServ;
        serviceDataFactory.selectedService = $scope.selectedServ;
        
        $location.path('/ajanvaraus_sisaankirjauduttu').replace();
    }
    
    // kun valitaan työntekijä
    $scope.selectServicesByEmployee = function(){
        console.log('loginDoneReservationSelectServiceController/selectServicesByEmployee');
        
        console.log('$scope.selectedEmpl');
        console.log($scope.selectedEmpl);
        
        employeeDataFactory.selectedEmployee = $scope.selectedEmpl;
        
        if ($scope.selectedEmpl.name === 'Kuka tahansa'){
            //employeeDataFactory.getServiceChoises(dataCallBackServices);
            serviceChoiseDataFactory.getAll(dataCallBackServices);
        } else {
            console.log('$scope.selectedEmpl');
            console.log($scope.selectedEmpl);
            console.log('employeeDataFactory.selectedEmployee');
            console.log(employeeDataFactory.selectedEmployee);
            //employeeDataFactory.selectedEmployee = $scope.selectedEmpl;
            //employeeDataFactory.getServices(dataCallBackServices);
            serviceDataFactory.getAll(employeeDataFactory.selectedEmployee, dataCallBackServices);
        }
    }

});