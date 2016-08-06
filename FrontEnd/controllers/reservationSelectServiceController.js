main_module.controller('reservationSelectServiceController',function($scope,$location,employeeDataFactory,serviceChoiseDataFactory,serviceDataFactory,customerLoginFactory,$timeout,Flash){
    
    console.log('reservationSelectServiceController loaded');
    
    $scope.employeeData = [];
    $scope.selectedEmployee = [];
    $scope.serviceChoiseData = [];
    $scope.selectedServ = null;
    $scope.selectedEmpl = null;
    $scope.user = {};

    $scope.navbarData = {
        
        urls:['#/','#/palvelun_valinta',"#/palvelut_ja_hinnasto",'#/yhteystiedot'],
        texts:['Etusivu','Palvelun valinta','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['','active','','']
    }
    
    serviceChoiseDataFactory.getAll(dataCallBackServices);
    
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
            email:'kukatahansa@tukkapolly.fi'
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
        console.log('reservationSelectServiceController/selectServiceClicked');
        
        console.log('$scope.selectedServ');
        console.log($scope.selectedServ);
        
        serviceDataFactory.selectedService = $scope.selectedServ;
        
        $location.path('/ajanvaraus').replace();
    }
    
    // kun valitaan työntekijä
    $scope.selectServicesByEmployee = function(){
        console.log('reservationSelectServiceController/selectServicesByEmployee');
        
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
            serviceDataFactory.getAll(employeeDataFactory.selectedEmployee, dataCallBackServices);
        }
    }

    // liittyy customer_login-direktiiviin
    $scope.submit = function(){
        console.log('reservationSelectServiceController/submit');
        
        console.log($scope.user);
        
        var temp = {
            username:$scope.user.username,
            password:$scope.user.passwd,
        }
        
        var waitPromise = customerLoginFactory.startLogin(temp);
        
        //Wait the response from server
        waitPromise.then(function(ok1){
            $location.path('/palvelun_valinta_sisaankirjauduttu').replace();
            //code inside this block will be called when success response
            //from server receives
        },function(err1){
            Flash.create('danger', 'Annettu väärä käyttäjänimi tai salasana', 'custom-class');
            
            $scope.user.username = "";
            $scope.user.passwd = "";
            
            $timeout(function(){
                $location.path('/palvelun_valinta_sisaankirjauduttu').replace();
            }, 2000);
        });
    }

});