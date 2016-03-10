main_module.controller('employeeDeleteEditController',function($scope,employeeDataFactory,$location,Flash){
    
    console.log('employeeDeleteEditController loaded');
    
    $scope.navbarData = {
        
        urls:['/logout'],
        texts:['Poistu'],
        classes:['']
    }
    
    $scope.deleteArray = [];
    
    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    console.log($scope.selectedEmployee);
    
    $scope.id = $scope.selectedEmployee._id;
    $scope.name = $scope.selectedEmployee.name;
    $scope.passwd = $scope.selectedEmployee.password;
    $scope.emailaddr = $scope.selectedEmployee.email;
    $scope.emplrole = $scope.selectedEmployee.role;
    
    $scope.saveEmployeeClicked = function(){
        
        console.log('employeeDeleteEditController/saveEmployeeClicked');
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveEmployee').attr("disabled", true);
        
        var temp = {
            id:$scope.id,
            name:$scope.name,
            password:$scope.passwd,
            email:$scope.emailaddr,
            role:$scope.emplrole
        }
        
        console.log(temp);
        
        employeeDataFactory.updateData(temp).then(success,error);
        
    }
    
    function success(){
        
        console.log('employeeDeleteEditController/success');
        
        employeeDataFactory.serviceChoiseArray = [];
        $scope.name = "";
        $scope.passwd = "";
        $scope.emailaddr = "";
        $scope.emplrole = "";
        
        Flash.create('success', 'Työntekijän tietoja muokattu onnistuneesti!', 'custom-class');
        
        // sallitaan Save-napin painaminen
        $('#saveEmployee').attr("disabled", false);
        //$location.path('palvelut_paavalikko').replace();
    }
    
    function error(data){
        
        console.log('employeeDeleteEditController/error');
        
        Flash.create('danger','Palvelun tietojen muokkaus epäonnistui. Koodi oli jo käytössä!', 'custom-class');
        
        // sallitaan Save-napin painaminen
        $('#saveEmployee').attr("disabled", false);
    }
    
    
    $scope.deleteEmployeeClicked = function(){
        
        console.log('employeeDeleteEditController/deleteEmployeeClicked');
        
        // estetään Delete-napin painaminen sillä välin kun tiedot poistetaan tietokannasta
        $('#deleteEmployee').attr("disabled", true);
        
        //Add the id to our delete array
        var id = $scope.id;
        console.log(id);
        $scope.deleteArray.push(id);
        
        //Nothing to delete
        if($scope.deleteArray.length === 0){
            
            Flash.create('danger','Ei mitään poistettavaa työntekijää!', 'custom-class');
            console.log('nothing to delete');
            
            // sallitaan Delete-napin painaminen
            $('#deleteEmployee').attr("disabled", false);
        }
        else{
            
            var data = {
                
                forDelete:$scope.deleteArray
            }
            console.log(data);
            
            employeeDataFactory.deleteData(data).then(function(data){

                employeeDataFactory.employeeArray = [];
                $location.path('/tyontekija_paavalikko').replace();
                
            },function(error){
                
                Flash.create('danger','Työntekijän tietojen poisto epäonnistui!', 'custom-class'); 
                console.log('error in server');
                
                // sallitaan Delete-napin painaminen
                $('#deleteEmployee').attr("disabled", false);
            });
        }
        
    }
    
    
});
