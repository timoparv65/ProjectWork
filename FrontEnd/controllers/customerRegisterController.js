main_module.controller('customerRegisterController',function($scope,$location,customerLoginFactory,Flash){
    
    console.log('customerRegisterController loaded');
    
    $scope.navbarData = {
        
        urls:['#/palvelun_valinta','#asiakas_rekisteroi'],
        texts:['Palvelun valinta','Rekisteröityminen'],
        classes:['','active']
    }
    
    $scope.user = {};

    $scope.submit = function(){
        console.log('customerRegisterController/submit');
        
        console.log($scope.user);
        
        var temp = {
            email:$scope.user.email,
            name:$scope.user.username,
            mobileNumber:$scope.user.phone,
            password:$scope.user.passwd,
        }
        
        var waitPromise = customerLoginFactory.startRegister(temp);
        
        //Wait the response from server
        waitPromise.then(function(ok1){
            $location.path('/palvelun_valinta');
            //code inside this block will be called when success response
            //from server receives
        },function(err1){
            Flash.create('danger', 'Käyttäjänimi, sähköpostiosoite tai salasana väärä!', 'custom-class');            
        });
    }
    
});