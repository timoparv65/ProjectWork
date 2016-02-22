main_module.controller('loginAddEmployeeAndServicesController',function($scope,loginFactory,$location,Flash){
    
    console.log('loginAddEmployeeAndServicesController');
    
    
    $scope.navbarData = {
        
        urls:['/logout','#/','#/sovelluksen_hallinnointi_login'],
        texts:['Poistu','Pääsivu','Sovelluksen hallinnointi'],
        classes:['','','active']
    }
    
    //This is called when login button is pressed in partial_login.html
    $scope.loginClicked = function(){
        
        console.log('loginAddEmployeeAndServicesController/loginClicked');
        
        var temp = {
            username:$scope.user,
            password:$scope.passwd,
        }
        
        var waitPromise = loginFactory.startLogin(temp);
        
        //Wait the response from server
        waitPromise.then(function(data){
            $location.path('/sovelluksen_hallinnointi_paasivu');
        },function(data){
            Flash.create('danger', 'Annettu väärä käyttäjänimi tai salasana', 'custom-class');            
        });
    }
    
});