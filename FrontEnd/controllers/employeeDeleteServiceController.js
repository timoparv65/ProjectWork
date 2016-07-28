main_module.controller('employeeDeleteServiceController',function($scope,employeeDataFactory,serviceDataFactory,Flash,$location,$timeout){
    
    console.log('employeeDeleteServiceController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/tyontekijan_palvelut_paavalikko','#/tyontekija_poista_palvelu'],
        texts:['Poistu','Palvelut','Poista palvelu'],
        classes:['','','active']
    }
    
    $scope.deleteArray = [];
    $scope.serviceData = [];
    
    $scope.selectedEmployee = employeeDataFactory.getSelectedEmployee();
    
    //employeeDataFactory.getServices(dataCallback);
    serviceDataFactory.getAll($scope.selectedEmployee, dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('employeeDeleteServiceController/dataCallback');
        console.log(dataArray);
        
        $scope.serviceData = dataArray;
    }
    
    //Called when user click one of the checkboxes from table
    //First argument is a event. There we can check if checkbox is selected
    //or not. Index is the index of cliked row in table. Id is the id of 
    //service we want to delete
    $scope.addToDelete = function($event,$index,id){
        
        console.log('employeeDeleteServiceController/addToDelete');
        console.log('id: ' + id);
        
        //Check if item was selected
        if($event.target.checked){
            //Add the id to our delete array
            $scope.deleteArray.push(id);
        }
        else{
            //Remove if item was unchecked
            var temp_index = jQuery.inArray(id, $scope.deleteArray);
            $scope.deleteArray.splice(temp_index,1);
        }
        console.log($scope.deleteArray);
    }
    
    //This is called when delete button is pressed
    $scope.sendToDelete = function(){
        
        console.log('employeeDeleteServiceController/sendToDelete');
        
        //Nothing to delete
        if($scope.deleteArray.length === 0){
            
            Flash.create('warning', 'Ei poistettavaa!', 'custom-class');
            
            $timeout(function(){
                $location.path('/tyontekijan_palvelut_paavalikko').replace();
            }, 2000);
        }
        else{
            
            console.log('$scope.selectedEmployee.name: ' + $scope.selectedEmployee.name);
            
            var data = {
                name:$scope.selectedEmployee.name,
                forDelete:$scope.deleteArray
            }
            
            console.log(data);
            
            //employeeDataFactory.deleteServiceData(data).then(function(data){
            serviceDataFactory.deleteData(data).then(function(data){
                //employeeDataFactory.serviceArray = [];
                serviceDataFactory.array = [];
                
                Flash.create('success', 'Poistettu työntekijän palvelu', 'custom-class');
                
                $timeout(function(){
                    $location.path('/tyontekijan_palvelut_paavalikko').replace();
                }, 2000);
                
            },function(error){
                
                Flash.create('warning', 'Virhe palvelimessa!', 'custom-class');
                
                $timeout(function(){
                    $location.path('/tyontekijan_palvelut_paavalikko').replace();
                }, 2000);
            });
        }
    }
    
});
