var main_module = angular.module('main_module',['ngRoute','ngResource','flash']);

main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        
        templateUrl:'partial_employeeReservationsView.html',
        controller:'employeeReservationsController'
        
    }).when('/tyontekija_paavalikko',{
        
        templateUrl:'partial_employeeDataView.html',
        controller:'employeeDataController'
    
    }).when('/lisaa_tyontekija',{
        
        templateUrl:'partial_employeeAddView.html',
        controller:'employeeAddController'
        
    }).when('/poista_tyontekija',{
        
        templateUrl:'partial_employeeDeleteView.html',
        controller:'employeeDeleteController'
        
    }).when('/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko',{
        
        templateUrl:'partial_employeeListFunctionsView.html',
        controller:'employeeListFunctionsController'
        
    }).when('/tyontekija_muokkaa_tietoja',{
    
        templateUrl:'partial_employeeEditView.html',
        controller:'employeeEditController'
        
    }).when('/tyontekijan_palvelut_paavalikko',{
        
        templateUrl:'partial_employeeServicesMainView.html',
        controller:'employeeServiceMainController'
        
    }).when('/tyontekija_lisaa_palvelu',{
        
        templateUrl:'partial_employeeAddServiceView.html',
        controller:'employeeAddServiceController'
        
    }).when('/tyontekija_muokkaa_palvelua',{
        
        templateUrl:'partial_employeeEditServiceView.html',
        controller:'employeeEditServiceController'
        
    }).when('/tyontekija_poista_palvelu',{
        
        templateUrl:'partial_employeeDeleteServiceView.html',
        controller:'employeeDeleteServiceController'
        
    });
    
    
});