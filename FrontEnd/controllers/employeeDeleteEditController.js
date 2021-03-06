main_module.controller('employeeDeleteEditController',function($scope,employeeDataFactory,serviceChoiseDataFactory,$location,Flash,$timeout){
    
    console.log('employeeDeleteEditController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko','#/tyontekija_muokkaa_poista'],
        texts:['Poistu','Työntekijä','Muokkaa/poista'],
        classes:['','','active']
    }
    
    $scope.roles = [
        {name: 'Membed', value: 'member'},
        {name: 'Admin', value: 'admin'}
    ];
    
    $scope.deleteArray = [];
    
    $scope.selectedEmployee = employeeDataFactory.getSelected();
    console.log($scope.selectedEmployee);
    
    $scope.id = $scope.selectedEmployee._id;
    $scope.name = $scope.selectedEmployee.name;
    $scope.passwd = $scope.selectedEmployee.password;
    $scope.emailaddr = $scope.selectedEmployee.email;
    //$scope.emplrole = $scope.selectedEmployee.role;
    $scope.selectedRole = $scope.selectedEmployee.role;
    
    $scope.saveEmployeeClicked = function(){
        
        console.log('employeeDeleteEditController/saveEmployeeClicked');
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveEmployee').attr("disabled", true);
        
        var temp = {
            id:$scope.id,
            name:$scope.name,
            password:$scope.passwd,
            email:$scope.emailaddr,
            //role:$scope.emplrole
            role:$scope.selectedRole
        }
        
        console.log(temp);
        
        employeeDataFactory.updateData(temp).then(success,error);
        
    }
    
    function success(){
        
        console.log('employeeDeleteEditController/success');
        
        serviceChoiseDataFactory.array = [];
        $scope.name = "";
        $scope.passwd = "";
        $scope.emailaddr = "";
        //$scope.emplrole = "";
        $scope.selectedRole = "";
        
        Flash.create('success', 'Työntekijän tietoja muokattu onnistuneesti!', 'custom-class');
        
        // sallitaan Save-napin painaminen
        $('#saveEmployee').attr("disabled", false);
        
        $timeout(function(){
            $location.path('/tyontekija_paavalikko').replace();
        }, 2000);
    }
    
    function error(data){
        
        console.log('employeeDeleteEditController/error');
        
        Flash.create('warning','Työntekijän tietojen muokkaus epäonnistui!', 'custom-class');
        
        // sallitaan Save-napin painaminen
        $('#saveEmployee').attr("disabled", false);
        
        $timeout(function(){
            $location.path('/tyontekija_paavalikko').replace();
        }, 2000);
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
            
            Flash.create('info','Ei mitään poistettavaa työntekijää!', 'custom-class');
            console.log('nothing to delete');
            
            // sallitaan Delete-napin painaminen
            $('#deleteEmployee').attr("disabled", false);
            
            $timeout(function(){
                $location.path('/tyontekija_paavalikko').replace();
            }, 2000);
        }
        else{
            
            var data = {
                
                forDelete:$scope.deleteArray
            }
            console.log(data);
            
            employeeDataFactory.deleteData(data).then(function(data){

                employeeDataFactory.array = [];
                
                Flash.create('success','Työntekijä poistettu!', 'custom-class');
                
                $timeout(function(){
                    $location.path('/tyontekija_paavalikko').replace();
                }, 2000);
                
            },function(error){
                
                Flash.create('warning','Työntekijän tietojen poisto epäonnistui!', 'custom-class'); 
                console.log('error in server');
                
                // sallitaan Delete-napin painaminen
                $('#deleteEmployee').attr("disabled", false);
                
                $timeout(function(){
                    $location.path('/tyontekija_paavalikko').replace();
                }, 2000);
            });
        }
        
    }
    
    
});
