main_module.controller('loginController',function($scope,loginFactory,$location,Flash){
    
    
    //This is called when login button is pressed in partial_login.html
    $scope.loginClicked = function(){
        
        console.log('loginController/login was pressed');
        
        var temp = {
            username:$scope.user,
            password:$scope.passwd,
        }
        
        var waitPromise = loginFactory.startLogin(temp);
        
        //Wait the response from server
        waitPromise.then(function(data){
            $location.path('/list_employee');
            //code inside this block will be called when success response
            //from server receives
        },function(data){
            Flash.create('danger', 'Annettu väärä käyttäjänimi tai salasana', 'custom-class');            
        });
    }
    
    $scope.registerClicked = function(){
        
        console.log('loginController/register was pressed');
        
        var temp = {
            username:$scope.user,
            password:$scope.passwd,
        }
         
        var waitPromise = loginFactory.startRegister(temp);
        
        //Wait the response from server
        waitPromise.then(success,error)
    }
    
    function success(data){
    
        Flash.create('success', 'Lisätty uusi käyttäjä!', 'custom-class'); 
    }

    function error(data){

        Flash.create('danger', 'Käyttäjänimi jo käytössä!', 'custom-class');
    }
});