main_module.controller('administrativeMainController',function($scope,$location,Flash){
    
    console.log('administrativeMainController loaded');
    
    $scope.navbarData = {
        
        urls:['/logout','#/sovelluksen_hallinnointi_paasivu','#/palvelut_paavalikko','#/tyontekija_paavalikko'],
        texts:['Poistu','Hallinnointi pääsivu','Palvelut','Työntekijät'],
        classes:['','active','','']
    }
    
});