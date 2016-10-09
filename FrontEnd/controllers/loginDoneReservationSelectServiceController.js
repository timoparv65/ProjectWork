main_module.controller('loginDoneReservationSelectServiceController',function($scope,$location,customerDataFactory,employeeDataFactory,serviceChoiseDataFactory,serviceDataFactory){
    
    console.log('loginDoneReservationSelectServiceController loaded');

    $scope.employeeData = [];
    $scope.selectedEmployee = [];
    $scope.serviceChoiseData = [];
    $scope.selectedServ = null;
    $scope.selectedEmpl = null;
    $scope.customer = null;
    
    $scope.navbarData = {
        
        urls:['#/palvelun_valinta_sisaankirjauduttu',"#/palvelut_ja_hinnasto_sisaankirjauduttu",'#/yhteystiedot_sisaankirjauduttu'],
        texts:['Palvelun valinta','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['active','','']
    }
    
    customerDataFactory.getCustomer(dataCallbackCustomer);
    
    function dataCallbackCustomer(dataArray){
        console.log('loginDoneReservationSelectServiceController/dataCallbackCustomer');
        
        $scope.customer = dataArray[0];
    }
    
    serviceChoiseDataFactory.getAll(dataCallBackServices);
    
    function dataCallBackServices(dataArray){
        console.log('loginDoneReservationSelectServiceController/dataCallBackServices');
        
        $scope.serviceChoiseData = dataArray;
        $scope.selectedServ = dataArray[0];
    }
    
    employeeDataFactory.getAll(dataCallback);
    
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
        employeeDataFactory.selected = $scope.selectedEmpl;
    }
    
    // kun painetaan "seuraava"-nappia
    $scope.selectServiceClicked = function(){
        console.log('loginDoneReservationSelectServiceController/selectServiceClicked');
        
        console.log('$scope.selectedServ');
        console.log($scope.selectedServ);
        
        serviceDataFactory.selected = $scope.selectedServ;
        
        $location.path('/ajanvaraus_sisaankirjauduttu').replace();
    }
    
    // kun valitaan työntekijä
    $scope.selectServicesByEmployee = function(){
        console.log('loginDoneReservationSelectServiceController/selectServicesByEmployee');
        
        console.log('$scope.selectedEmpl');
        console.log($scope.selectedEmpl);
        
        employeeDataFactory.selected = $scope.selectedEmpl;
        
        if ($scope.selectedEmpl.name === 'Kuka tahansa'){
            serviceChoiseDataFactory.getAll(dataCallBackServices);
        } else {
            console.log('$scope.selectedEmpl');
            console.log($scope.selectedEmpl);
            console.log('employeeDataFactory.selected');
            console.log(employeeDataFactory.selected);
            serviceDataFactory.getAll(employeeDataFactory.selected, dataCallBackServices);
        }
    }

});