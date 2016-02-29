main_module.controller('employeeAdminLoginController',function($scope,employeeLoginFactory,$location,Flash){
    
    console.log('employeeAdminLoginController');
    
    
    $scope.navbarData = {
        
        urls:['/logout','#/','#/sovelluksen_hallinnointi_login'],
        texts:['Poistu','Pääsivu','Sovelluksen hallinnointi'],
        classes:['','','active']
    }
    
    //This is called when login button is pressed in partial_login.html
    $scope.loginClicked = function(){
        
        console.log('employeeAdminLoginController/loginClicked');
        
        var temp = {
            username:$scope.user,
            password:$scope.passwd,
        }
        
        var waitPromise = employeeLoginFactory.startLogin(temp);
        
        //Wait the response from server
        waitPromise.then(function(data){
            $location.path('/sovelluksen_hallinnointi_paasivu');
        },function(data){
            Flash.create('danger', 'Annettu väärä käyttäjänimi tai salasana', 'custom-class');            
        });
    }
    
});