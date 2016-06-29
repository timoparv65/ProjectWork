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

function loginRequiredToCustomerPrivatePages($q,$resource,$location,$http){
    
    //Create a promise object. Can be in two states: suceed or not
    var deferred = $q.defer();
    
    // promise joko onnistuu tai epäonnistuu
    // $promise tsekkaa mikä oli statuskoodi vastauksessa
    $resource('/isLoggedToCustomerPrivatePages').query().$promise.then(
    // Success function
    function success(){

        // Mark the promise to be solved (or resolved)
        deferred.resolve();
        return deferred; // palauta promise objekti
    
    },function fail(){ // Fail function

        //Mark promise to be failed
        deferred.reject();
        // Go back to root context
        $location.path('/ajanvaraus_palvelun_valinta');
        return deferred;
    });
}


main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        
        templateUrl:'partial_mainPageView.html',
        controller:'mainPageController'
        
    }).when('/ajanvaraus_palvelun_valinta',{
        
        templateUrl:'partial_reservationSelectServiceView.html',
        controller:'reservationSelectServiceController'
    
    }).when('/asiakas_rekisteroi',{
        
        templateUrl:'partial_customerRegisterView.html',
        controller:'customerRegisterController'
        
    }).when('/asiakas_salasana_unohtui',{
        
        templateUrl:'partial_customerForgotPasswordView.html',
        controller:'customerForgotPasswordController'
        
    }).when('/ajanvaraus_ajan_valinta',{
        
        templateUrl:'partial_reservationSelectTimeView.html',
        controller:'reservationSelectTimeController'
        
    }).when('/ajanvaraus_sisaankirjauduttu',{
        
        templateUrl:'partial_loginDoneReservationView.html',
        controller:'loginDoneReservationController'
        
    }).when('/ajanvaraus_sisaankirjauduttu_ajan_valinta',{
        
        templateUrl:'partial_loginDoneReservationSelectTimeView.html',
        controller:'loginDoneReservationSelectTimeController'
    
    }).when('/palvelut_ja_hinnasto',{
        
        templateUrl:'partial_servicesAndPricesView.html',
        controller:'servicesAndPricesController'
        
    }).when('/yhteystiedot',{
        
        templateUrl:'partial_contactDetailsView.html',
        controller:'contactDetailController'
        
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
        
    }).when('/tyontekija_muokkaa_poista',{
        
        templateUrl:'partial_employeeDeleteEditView.html',
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
    
    }).when('/tyontekijan_varaukset_paavalikko',{
        
        templateUrl:'partial_employeeReservationsMainView.html',
        controller:'employeeReservationsMainController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    }).when('/tyontekijan_poissaolot_paavalikko',{
        
        templateUrl:'partial_employeeAbsencesMainView.html',
        controller:'employeeAbsencesMainController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    }).when('/yritys_paavalikko',{
        
        templateUrl:'partial_companyDataView.html',
        controller:'companyDataController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    }).when('/yritys_lisaa',{
        
        templateUrl:'partial_companyAddView.html',
        controller:'companyAddController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
    
    }).when('/yritys_muokkaa_poista',{
        
        templateUrl:'partial_companyDeleteEditView.html',
        controller:'companyDeleteEditController',
        resolve:{loginRequiredToCompanyAdminPages:loginRequiredToCompanyAdminPages}
        
    });
    
});