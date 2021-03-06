//Here we create our main module. First argument is the name of the module, the second one
//the '[] array' contains the dependencies to other angular modules
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
    console.log('loginRequiredToCustomerPrivatePages');
    //Create a promise object. Can be in two states: suceed or not
    var deferred = $q.defer();
    
    // promise joko onnistuu tai epäonnistuu
    // $promise tsekkaa mikä oli statuskoodi vastauksessa
    $resource('/isLoggedToCustomerPrivatePages').query().$promise.then(
    // Success function
    function success(){
        console.log('onnistui');
        // Mark the promise to be solved (or resolved)
        deferred.resolve();
        return deferred; // palauta promise objekti
    
    },function fail(){ // Fail function
        console.log('epäonnistui');
        //Mark promise to be failed
        deferred.reject();
        // Go back to root context
        $location.path('/');
        return deferred;
    });
}

//Create basic configuration for our angular app.
//Configuration includes USUALLY a router for our views.
//The $routeProvider object comes from ngRoute module
main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        
        templateUrl:'partial_mainPageView.html',
        controller:'mainPageController'
        
    }).when('/palvelun_valinta',{
        
        templateUrl:'partial_reservationSelectServiceView.html',
        controller:'reservationSelectServiceController'
    
    }).when('/asiakas_rekisteroi',{
        
        templateUrl:'partial_customerRegisterView.html',
        controller:'customerRegisterController'
        
    }).when('/asiakas_salasana_unohtui',{
        
        templateUrl:'partial_customerForgotPasswordView.html',
        controller:'customerForgotPasswordController'
        
    }).when('/ajanvaraus',{
        
        templateUrl:'partial_reservationSelectTimeView.html',
        controller:'reservationSelectTimeController'
        
    }).when('/palvelun_valinta_sisaankirjauduttu',{
        
        templateUrl:'partial_loginDoneReservationSelectServiceView.html',
        controller:'loginDoneReservationSelectServiceController',
        resolve:{loginRequiredToCustomerPrivatePages:loginRequiredToCustomerPrivatePages}
        
    }).when('/ajanvaraus_sisaankirjauduttu',{
        
        templateUrl:'partial_loginDoneReservationSelectTimeView.html',
        controller:'loginDoneReservationSelectTimeController',
        resolve:{loginRequiredToCustomerPrivatePages:loginRequiredToCustomerPrivatePages}
    
    }).when('/asiakas_tiedot_sisaankirjauduttu',{
        
        templateUrl:'partial_loginDoneShowCustomerInformationView.html',
        controller:'loginDoneShowCustomerInformationController',
        resolve:{loginRequiredToCustomerPrivatePages:loginRequiredToCustomerPrivatePages}
        
    }).when('/asiakas_muokkaa_tietoja_sisaankirjauduttu',{
        
        templateUrl:'partial_loginDoneChangeCustomerInformationView.html',
        controller:'loginDoneChangeCustomerInformationController',
        resolve:{loginRequiredToCustomerPrivatePages:loginRequiredToCustomerPrivatePages}
        
    }).when('/asiakas_nayta_varaukset_sisaankirjauduttu',{
        
        templateUrl:'partial_loginDoneShowCustomerReservationsView.html',
        controller:'loginDoneShowCustomerReservationsController',
        resolve:{loginRequiredToCustomerPrivatePages:loginRequiredToCustomerPrivatePages}
        
    }).when('/palvelut_ja_hinnasto',{
        
        templateUrl:'partial_servicesAndPricesView.html',
        controller:'servicesAndPricesController'
        
    }).when('/palvelut_ja_hinnasto_sisaankirjauduttu',{
        
        templateUrl:'partial_servicesAndPricesView.html',
        controller:'loginDoneServicesAndPricesController',
        resolve:{loginRequiredToCustomerPrivatePages:loginRequiredToCustomerPrivatePages}
        
    }).when('/yhteystiedot',{
        
        templateUrl:'partial_contactDetailsView.html',
        controller:'contactDetailsController'
        
    }).when('/yhteystiedot_sisaankirjauduttu',{
        
        templateUrl:'partial_contactDetailsView.html',
        controller:'loginDoneContactDetailsController',
        resolve:{loginRequiredToCustomerPrivatePages:loginRequiredToCustomerPrivatePages}
        
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