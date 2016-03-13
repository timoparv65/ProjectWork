main_module.controller('companyListFunctionsController',function($scope,companyDataFactory){
    
    console.log('companyListFunctionsController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu'],
        texts:['Poistu'],
        classes:['']
    }
    
    $scope.selectedCompany = companyDataFactory.getSelectedCompany();
    console.log('$scope.selectedCompany');
    console.log($scope.selectedCompany);
    
});