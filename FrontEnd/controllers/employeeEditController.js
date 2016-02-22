main_module.controller('employeeEditController',function($scope,employeeDataFactory,$location,Flash){
    
    console.log('employeeEditController loaded');
    
    $scope.navbarData = {
        
        urls:[],
        texts:[],
        classes:[]
    }
    
    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log($scope.selectedEmployee);
    
    $scope.id = $scope.selectedEmployee._id;
    $scope.name = $scope.selectedEmployee.name;
    $scope.passwd = $scope.selectedEmployee.password;
    $scope.emailaddr = $scope.selectedEmployee.email;
    
    $scope.saveEmployeeClicked = function(){
        
        console.log('employeeEditController/saveEmployeeClicked');
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveEmployee').attr("disabled", true);
        
        var temp = {
            id:$scope.id,
            name:$scope.name,
            password:$scope.passwd,
            email:$scope.emailaddr
        }
        
        console.log(temp);
        
       // employeeDataFactory.updateData(temp).then(success,error);
        employeeDataFactory.updateData(temp).then(success,error);
        
    }
    
    function success(){
        
        console.log('employeeEditController/success');
        
        employeeDataFactory.employeeArray = [];
        $scope.name = "";
        $scope.passwd = "";
        $scope.emailaddr = "";
        
        Flash.create('success', 'Työntekijän tietoja muokattu onnistuneesti!', 'custom-class');
        
        // sallitaan Save-napin painaminen
        $('#saveEmployee').attr("disabled", false);
        //$location.path('/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko').replace();
    }
    
    function error(data){
        
        console.log('employeeEditController/error');
        
        Flash.create('danger',data.message, 'custom-class'); 
    }
    
});
