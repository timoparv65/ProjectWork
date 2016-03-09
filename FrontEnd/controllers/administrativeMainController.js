main_module.controller('administrativeMainController',function($scope,$location,Flash){
    
    console.log('administrativeMainController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/sovelluksen_hallinnointi_paasivu','#/palvelut_paavalikko','#/tyontekija_paavalikko','#yritys_paavalikko'],
        texts:['Poistu','Hallinnointi pääsivu','Palvelut','Työntekijät','Yritys'],
        classes:['','active','','','']
    }
    
});