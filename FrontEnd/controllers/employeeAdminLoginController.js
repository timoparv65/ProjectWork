main_module.controller('employeeAdminLoginController',function($scope,employeeLoginFactory,$location,Flash){
    
    console.log('employeeAdminLoginController');
    
    
    $scope.navbarData = {
        
        urls:['/logout','#/','#/sovelluksen_hallinnointi_login'],
        texts:['Poistu','Pääsivu','Sovelluksen hallinnointi'],
        classes:['','','active']
    }
    
    //This is called when login button is pressed in partial_login.html
    /*
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
    */
    
    
    //This is called when login button is pressed in partial_employeeAdminLoginView.html
    $scope.loginClicked = function(){
        
        console.log('employeeAdminLoginController/loginClicked');
        
        var temp = {
            username:$scope.user,
            password:$scope.passwd,
        }
        
        var waitPromise = employeeLoginFactory.startAdminLogin(temp);
        
        //Wait the response from server
        waitPromise.then(function(ok1){
            
            console.log('ok1');
            console.log(ok1);
            
            // Ckeck if user has permissions for login
            var waitPromise2 = employeeLoginFactory.checkRoleForEnteringCompanyAdminPages();
            
            waitPromise2.then(function(ok2){
                return $location.path('/sovelluksen_hallinnointi_paasivu');
            },function(err2){
                console.log('err2');
                console.log(err2.message);
                Flash.create('danger', 'Käyttäjällä ei ole oikeutta palveluun', 'custom-class');
            });
            
        },function(err1){
            console.log('err1');
            console.log(err1.message);
            
            Flash.create('danger', 'Annettu väärä käyttäjänimi tai salasana', 'custom-class');
        });
    }
    
});