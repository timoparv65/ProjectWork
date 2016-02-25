var main_module = angular.module('main_module',['ngRoute','ngResource','flash']);

main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        
        templateUrl:'partial_loginView.html',
        controller:'loginController'
    
    }).when('/sovelluksen_paasivu',{
        
        templateUrl:'partial_employeeReservationsView.html',
        controller:'employeeReservationsController'
    
    }).when('/sovelluksen_hallinnointi_login',{
        
        templateUrl:'partial_loginAddEmployeeAndServiceView.html',
        controller:'loginAddEmployeeAndServicesController'
    
    }).when('/sovelluksen_hallinnointi_paasivu',{
        
        templateUrl:'partial_administrativeMainView.html',
        controller:'administrativeMainController'
        
    }).when('/palvelut_paavalikko',{
        
        templateUrl:'partial_serviceDataView.html',
        controller:'serviceDataController'

    }).when('/palvelu_lisaa',{
        
        templateUrl:'partial_serviceAddView.html',
        controller:'serviceAddController'
        
    }).when('/palvelu_muokkaa_poista',{
        
        templateUrl:'partial_serviceDeleteEditView.html',
        controller:'serviceDeleteEditController'
        
    }).when('/tyontekija_paavalikko',{
        
        templateUrl:'partial_employeeDataView.html',
        controller:'employeeDataController'

    }).when('/tyontekija_lisaa',{
        
        templateUrl:'partial_employeeAddView.html',
        controller:'employeeAddController'
        
    }).when('/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko',{
        
        templateUrl:'partial_employeeListFunctionsView.html',
        controller:'employeeListFunctionsController'
        
    }).when('/tyontekija_poista',{
        
        templateUrl:'partial_employeeDeleteView.html',
        controller:'employeeDeleteController'
    
    }).when('/tyontekija_muokkaa_tietoja',{
    
        templateUrl:'partial_employeeEditView.html',
        controller:'employeeEditController'
    
    }).when('/tyontekijan_palvelut_paavalikko',{
        
        templateUrl:'partial_employeeServicesMainView.html',
        controller:'employeeServiceMainController'
        
    }).when('/tyontekija_lisaa_palvelu',{
        
        templateUrl:'partial_employeeAddServiceView.html',
        controller:'employeeAddServiceController'
        
    }).when('/tyontekija_poista_palvelu',{
        
        templateUrl:'partial_employeeDeleteServiceView.html',
        controller:'employeeDeleteServiceController'
        
    });
    
    
});