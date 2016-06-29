main_module.controller('customerRegisterController',function($scope){
    
    console.log('customerRegisterController loaded');
    
    $scope.navbarData = {
        
        urls:[],
        texts:[],
        classes:[]
    }
    
    $scope.user = {};

    $scope.submit = function(){
        console.log('customerRegisterController/submit');
        
        console.log($scope.user);
        
        var temp = {
            username:$scope.user.username,
            password:$scope.user.passwd,
            email:$scope.user.email,
            mobileNumber:$scope.user.phone
        }
        
        var waitPromise = customerLoginFactory.startLogin(temp);
        
        //Wait the response from server
        waitPromise.then(function(ok1){
            $location.path('/reservationSelectServiceController');
            //code inside this block will be called when success response
            //from server receives
        },function(err1){
            Flash.create('danger', 'Käyttäjä tällä sähköpostiosoitteella jo olemassa', 'custom-class');            
        });
    }
    
});