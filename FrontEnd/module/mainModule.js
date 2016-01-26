// luo Module:n, kts. kuva. Nimetty main_module:ksi.
// Here we create our main module. First argument is the name of the module, the second one
// the '[] array' contains the dependences to other angular modules
var main_module = angular.module('main_module',['ngRoute','ngResource','flash']);

// Create basic configuration for out angular app.
// Configuration includes USUALLY a router for our views.
// The $routerProvider object comes from ngRoute module => liittyy ng-view direktiiviin
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