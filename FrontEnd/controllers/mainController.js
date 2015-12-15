main_module.controller('mainController',function($scope,$location){
    
    console.log('mainController loaded');
    
    $scope.add = function(){
        //$location.path('/add')
        console.log('mainController/$scope.add');
    }
    
    $scope.delete = function(){
          console.log('mainController/$scope.delete');
    };
    
});