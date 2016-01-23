main_module.controller('deleteEmployeeController',function($scope,employeeDataFactory,$location){
    
    console.log('deleteEmployeeController loaded');
    
    $scope.deleteArray = [];
    
    employeeDataFactory.getEmployees(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('deleteEmployeeController/dataCallback');
    
        $scope.employeeData = dataArray;
    }
    
    //Called when user click one of the checkboxes from table
    //First argument is a event. There we can check if checkbox is selected
    //or not. Index is the index of cliked row in table. Id is the id of 
    //employee we want to delete
    $scope.addToDelete = function($event,$index,id){
        
        console.log('deleteEmployeeController/addToDelete');
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
        
        console.log('deleteEmployeeController/sendToDelete');
        
        //Nothing to delete
        if($scope.deleteArray.length === 0){
            
            console.log('nothing to delete');
        }
        else{
            
            var data = {
                
                forDelete:$scope.deleteArray
            }
            console.log('data: ' + data);
            
            employeeDataFactory.deleteData(data).then(function(data){
                
                //employeeDataFactory.serviceArray = [];
                employeeDataFactory.employeeArray = [];
                $location.path('/tyontekija_paavalikko').replace();
                
            },function(error){
                
                console.log('error in server');
            });
        }
    }
    
});
