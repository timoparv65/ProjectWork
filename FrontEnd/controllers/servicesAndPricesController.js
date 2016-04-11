main_module.controller('servicesAndPricesController',function($scope){
    
    console.log('servicesAndPricesController loaded');
    
    $scope.navbarData = {
        
        urls:['#/','#/ajanvaraus',"#/palvelut_ja_hinnasto",'#/yhteystiedot'],
        texts:['Etusivu','Ajanvaraus','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['','','active','']
    }
    
    
});