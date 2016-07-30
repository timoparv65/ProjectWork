main_module.controller('companyDataController',function($scope,companyDataFactory,$location){
    
    console.log('companyDataController loaded');
    
    $scope.companyData = [];
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/sovelluksen_hallinnointi_paasivu','#/yritys_paavalikko','#/yritys_lisaa'],
        texts:['Poistu','Hallinnointi pääsivu','Yritys','Lisää yrityksen tiedot'],
        classes:['','','active','','']
    }
    
    companyDataFactory.getInformation(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('companyDataController/dataCallback');
        console.log(dataArray);
    
        $scope.companyData = dataArray;
        
    }
    
    $scope.rowClicked = function(id){
        
        console.log('companyDataController/rowClicked');
        
        companyDataFactory.selected_id = id;
        console.log('companyDataFactory.selected_id: ' + companyDataFactory.selected_id);
        //$location.path('/yrityksen_tiedot_paavalikko').replace();
        $location.path('/yritys_muokkaa_poista');
    }
    
    
});