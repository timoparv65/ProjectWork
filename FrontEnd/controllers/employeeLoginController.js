main_module.controller('employeeLoginController',function($scope,employeeLoginFactory,$location,Flash,companyDataFactory){
    
    console.log('employeeLoginController loaded');
    
    $scope.companyData = [];
    
    companyDataFactory.getCompanyInformation(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('mainController/dataCallback');
        console.log("dataArray[0]");
        console.log(dataArray[0]);
    
        $scope.companyData = dataArray[0];
    }
    
    //This is called when login button is pressed in partial_login.html
    $scope.loginClicked = function(){
        
        console.log('employeeLoginController/loginClicked');
        
        var temp = {
            username:$scope.user,
            password:$scope.passwd,
        }
        
        var waitPromise = employeeLoginFactory.startLogin(temp);
        
        //Wait the response from server
        waitPromise.then(function(ok1){
            
            console.log('ok1');
            console.log(ok1);
            
            // Ckeck if user has permissions for login
            var waitPromise2 = employeeLoginFactory.checkRoleForEnteringCompanyInternalPages();
            
            waitPromise2.then(function(ok2){
                return $location.path('/sovelluksen_paasivu');
            },function(err2){
                console.log('err2');
                console.log(err2.message);
                Flash.create('danger', 'Käyttäjällä ei ole oikeutta palveluun', 'custom-class');
            });
            
            //$location.path('/sovelluksen_paasivu');
            //code inside this block will be called when success response
            //from server receives
        },function(err1){
            console.log('err1');
            console.log(err1.message);
            
            Flash.create('danger', 'Annettu väärä käyttäjänimi tai salasana', 'custom-class');
        });
    }
    
    
});