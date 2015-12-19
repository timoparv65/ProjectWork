// luo Module:n, kts. kuva. Nimetty main_module:ksi.
// Here we create our main module. First argument is the name of the module, the second one
// the '[] array' contains the dependences to other angular modules
var main_module = angular.module('main_module',['ngRoute','ngResource','flash']);

// Create basic configuration for out angular app.
// Configuration includes USUALLY a router for our views.
// The $routerProvider object comes from ngRoute module => liittyy ng-view direktiiviin
main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        
        templateUrl:'partial_employeeDataView.html',
        controller:'employeeDataController'
        
    }).when('/insert_employee',{
        
        templateUrl:'partial_addEmployeeView.html',
        controller:'addEmployeeController'
        
    });
    
    
    
    
    
    
    /*.when('/list_employee',{
        
        templateUrl:'partial_employeeDataView.html',
        controller:'employeeDataController'
    });*/
    /*when('/insert_employee',{
        
        templateUrl:'partial_addEmployeeView.html',
        controller:'addEmployeeController'
        
    }).when('/delete_employee',{
        
        templateUrl:'partial_deleteEmployee.html',
        controller:'deleteEmployeeController'
        
    });
    */
});