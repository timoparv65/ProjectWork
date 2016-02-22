main_module.controller('administrativeMainController',function($scope,$location,Flash){
    
    console.log('administrativeMainController loaded');
    
    $scope.navbarData = {
        
        urls:['/logout','#/sovelluksen_hallinnointi_paasivu'],
        texts:['Poistu','Hallinnointi pääsivu'],
        classes:['','active']
    }
    
});