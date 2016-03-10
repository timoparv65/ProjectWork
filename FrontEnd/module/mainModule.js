var main_module = angular.module('main_module',['ngRoute','ngResource','flash']);

//This function will check if user is logged in or not. This function is used
//in the router below in resolved attribute
// =>$q = yleisin promise implementaatio (q-interface)
// => $promise = tehdään pyynnöt Back Endiin
function loginRequiredToCompanyPrivatePages($q,$resource,$location,$http){

    //Create a promise object. Can be in two states: suceed or not
    var deferred = $q.defer();

    // promise joko onnistuu tai epäonnistuu
    // $promise tsekkaa mikä oli statuskoodi vastauksessa
    $resource('/isLoggedToCompanyPrivatePages').query().$promise.then(
    // Success function
    function success(){

        // Mark the promise to be solved (or resolved)
        deferred.resolve();
        return deferred; // palauta promise objekti
    
    },function fail(){ // Fail function

        //Mark promise to be failed
        deferred.reject();
        // Go back to root context
        $location.path('/');
        return deferred;
    });

}


function loginRequiredToCompanyAdminPages($q,$resource,$location,$http){

    //Create a promise object. Can be in two states: suceed or not
    var deferred = $q.defer();

    // promise joko onnistuu tai epäonnistuu
    // $promise tsekkaa mikä oli statuskoodi vastauksessa
    $resource('/isLoggedToCompanyAdminPages').query().$promise.then(
    // Success function
    function success(){

        // Mark the promise to be solved (or resolved)
        deferred.resolve();
        return deferred; // palauta promise objekti
    
    },function fail(){ // Fail function

        //Mark promise to be failed
        deferred.reject();
        // Go back to root context
        $location.path('/sovelluksen_paasivu');
        return deferred;
    });

}


main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        
        templateUrl:'partial_mainView.html',
        controller:'mainController'
        
    }).when('/sisaisille_sivuille',{
        
        templateUrl:'partial_employeeLoginView.html',
        controller:'employeeLoginController'
    
    }).when('/sovelluksen_paasivu',{
        
        templateUrl:'partial_employeeReservationsView.html',
        controller:'employeeReservationsController',
        resolve:{loginRequiredToCompanyPrivatePages:loginRequiredToCompanyPrivatePages}
    
    }).when('/sovelluksen_hallinnointi_login',{
        
        templateUrl:'partial_employeeAdminLoginView.html',
        controller:'employeeAdminLoginController',
        resolve:{loginRequiredToCompanyPrivatePages:loginRequiredToCompanyPrivatePages}
    
    }).when('/sovelluksen_hallinnointi_paasivu',{
        
        templateUrl:'partial_administrativeMainView.html',
        controller:'administrativeMainController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}

    }).when('/palvelut_paavalikko',{

        templateUrl:'partial_serviceDataView.html',
        controller:'serviceDataController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}

    }).when('/palvelu_lisaa',{
        
        templateUrl:'partial_serviceAddView.html',
        controller:'serviceAddController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    }).when('/palvelu_muokkaa_poista',{
        
        templateUrl:'partial_serviceDeleteEditView.html',
        controller:'serviceDeleteEditController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    }).when('/tyontekija_paavalikko',{
        
        templateUrl:'partial_employeeDataView.html',
        controller:'employeeDataController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}

    }).when('/tyontekija_lisaa',{
        
        templateUrl:'partial_employeeAddView.html',
        controller:'employeeAddController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    }).when('/tyontekijan_tiedot_palvelut_varaukset_poissaolot_paavalikko',{
        
        templateUrl:'partial_employeeListFunctionsView.html',
        controller:'employeeListFunctionsController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    }).when('/tyontekija_poista',{
        
        templateUrl:'partial_employeeDeleteView.html',
        controller:'employeeDeleteController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
    
    }).when('/tyontekija_muokkaa_tietoja',{
    
        templateUrl:'partial_employeeEditView.html',
        controller:'employeeEditController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    }).when('/tyontekija_muokkaa_poista',{
        
        emplateUrl:'partial_employeeDeleteEditView.html',
        controller:'employeeDeleteEditController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
    
    }).when('/tyontekijan_palvelut_paavalikko',{
        
        templateUrl:'partial_employeeServicesMainView.html',
        controller:'employeeServiceMainController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    }).when('/tyontekija_lisaa_palvelu',{
        
        templateUrl:'partial_employeeAddServiceView.html',
        controller:'employeeAddServiceController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    }).when('/tyontekija_poista_palvelu',{
        
        templateUrl:'partial_employeeDeleteServiceView.html',
        controller:'employeeDeleteServiceController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
    
    }).when('/yritys_paavalikko',{
        
        templateUrl:'partial_companyDataView.html',
        controller:'companyDataController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    }).when('/yritys_lisaa',{
        
        templateUrl:'partial_companyAddView.html',
        controller:'companyAddController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
    
    }).when('/yrityksen_tiedot_paavalikko',{
        
        templateUrl:'partial_companyListFunctionsView.html',
        controller:'companyListFunctionsController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    });
    
    
});