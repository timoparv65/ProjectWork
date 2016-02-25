main_module.controller('employeeLoginController',function($scope,employeeLoginFactory,$location,Flash){
    
    console.log('employeeLoginController loaded');
    
    //This is called when login button is pressed in partial_login.html
    $scope.loginClicked = function(){
        
        console.log('employeeLoginController/loginClicked');
        
        var temp = {
            username:$scope.user,
            password:$scope.passwd,
        }
        
        var waitPromise = employeeLoginFactory.startLogin(temp);
        
        //Wait the response from server
        waitPromise.then(function(data){
            $location.path('/sovelluksen_paasivu');
            //code inside this block will be called when success response
            //from server receives
        },function(data){
            Flash.create('danger', 'Annettu väärä käyttäjänimi tai salasana', 'custom-class');            
        });
    }
    
    /*
    $scope.registerClicked = function(){
        
        console.log('employeeLoginController/registerClicked');
        
        var temp = {
            username:$scope.user,
            password:$scope.passwd,
        }
         
        var waitPromise = employeeLoginFactory.startRegister(temp);
        
        //Wait the response from server
        waitPromise.then(success,error)
    }
    
    function success(data){
    
        Flash.create('success', 'Lisätty uusi käyttäjä!', 'custom-class'); 
    }

    function error(data){

        Flash.create('danger', 'Käyttäjänimi jo käytössä!', 'custom-class');
    }
    */
});