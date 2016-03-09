main_module.controller('companyDataController',function($scope,companyDataFactory,$location){
    
    console.log('companyDataController loaded');
    
    $scope.navbarData = {
        
        urls:['/logout','#/sovelluksen_hallinnointi_paasivu','#/yritys_paavalikko','#/yritys_lisaa'],
        texts:['Poistu','Hallinnointi pääsivu','Yritys','Lisää yrityksen tiedot'],
        classes:['','','active','']
    }
    
    companyDataFactory.getCompanyInformation(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('companyDataController/dataCallback');
        console.log(dataArray);
    
        $scope.companyData = dataArray;
        
    }
    
    $scope.rowClicked = function(id){
        
        console.log('companyDataController/rowClicked');
        
        companyDataFactory.selected_id = id;
        console.log('companyDataFactory.selected_id: ' + companyDataFactory.selected_id);
        //$location.path('/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko').replace();
        //$location.path('/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko');
    }
    
    
});