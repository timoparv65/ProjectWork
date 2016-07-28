main_module.controller('serviceDeleteEditController',function($scope,employeeDataFactory,serviceChoiseDataFactory,$location,$timeout,Flash){
    
    console.log('serviceDeleteEditController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/sovelluksen_hallinnointi_paasivu','#/palvelut_paavalikko','#/palvelu_muokkaa_poista'],
        texts:['Poistu','Hallinnointi pääsivu','Palvelut','Muokkaa tai poista palvelu'],
        classes:['','','','active']
    }
    
    // Alusta vektorit
    $scope.deleteArray = [];
    $scope.serviceCategories = [];
    
    // Haetaan palvelun tiedot
    //$scope.selectedService = employeeDataFactory.getSelectedServiceChoise();
    $scope.selectedService = serviceChoiseDataFactory.getSelected();
    //console.log($scope.selectedService);
    
    // Etsi kategoriaa vastaava kategoriataulukon indeksi
    searchCategory($scope.selectedService.category);
    selectDescription($scope.selectedService.category, $scope.selectedService.description);
    
    $scope.id = $scope.selectedService._id;
    $scope.extracategory = $scope.selectedService.categoryextrainfo;
    $scope.extra = $scope.selectedService.extrainfo;
    $scope.duration = $scope.selectedService.duration;
    $scope.servicePrice = $scope.selectedService.price;
    
    
    
    $scope.saveServiceClicked = function(){
        
        console.log('serviceDeleteEditController/saveServiceClicked');
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveService').attr("disabled", true);
        
        var temp = {
            id:$scope.id,
            category:$scope.selectedCaterogy.name,
            categoryextrainfo:$scope.extracategory,
            description:$scope.selectedDescription.name,
            extrainfo:$scope.extra,
            duration:$scope.duration,
            price:$scope.servicePrice
        }
        
        //console.log(temp);
        
        //employeeDataFactory.updateServiceChoiseData(temp).then(success,error);
        serviceChoiseDataFactory.updateData(temp).then(success,error);
        
    }
    
    function success(){
        
        console.log('serviceDeleteEditController/success');
        
        //employeeDataFactory.serviceChoiseArray = [];
        serviceChoiseDataFactory.array = [];
        $scope.selectedCaterogy = $scope.serviceCategories[0];
        $scope.extracategory = "";
        $scope.selectedDescription = $scope.serviceDescriptions[0];
        $scope.extra = "";
        $scope.duration = "";
        $scope.servicePrice = "";
        
        Flash.create('success', 'Palvelun tietoja muokattu onnistuneesti!', 'custom-class');
        
        // sallitaan Save-napin painaminen
        $('#saveService').attr("disabled", false);
        
        $timeout(function(){
            $location.path('/palvelut_paavalikko').replace();
        }, 4000);
    }
    
    function error(data){
        
        console.log('serviceDeleteEditController/error');
        
        Flash.create('danger','Palvelun tietojen muokkaus epäonnistui. Koodi oli jo käytössä!', 'custom-class');
        
        // sallitaan Save-napin painaminen
        $('#saveService').attr("disabled", false);
        
        $timeout(function(){
            $location.path('/palvelut_paavalikko').replace();
        }, 4000);
    }
    
    $scope.deleteServiceClicked = function(){
        
        console.log('serviceDeleteEditController/deleteServiceClicked');
        
        //Add the id to our delete array
        var id = $scope.id;
        //console.log(id);
        $scope.deleteArray.push(id);
        
        //Nothing to delete
        if($scope.deleteArray.length === 0){
            
            Flash.create('danger','Ei mitään poistettavaa palvelua!', 'custom-class');
            console.log('nothing to delete');
            
            $timeout(function(){
                $location.path('/palvelut_paavalikko').replace();
            }, 4000);
        }
        else{
            
            var data = {
                
                forDelete:$scope.deleteArray
            }
            //console.log(data);
            
            //employeeDataFactory.deleteServiceChoiseData(data).then(function(data){
            serviceChoiseDataFactory.deleteData(data).then(function(data){

                //employeeDataFactory.serviceChoiseArray = [];
                serviceChoiseDataFactory.array = [];
                $location.path('/palvelut_paavalikko').replace();
                
            },function(error){
                
                Flash.create('danger','Palvelun tietojen poisto epäonnistui!', 'custom-class'); 
                console.log('error in server');
                
                $timeout(function(){
                    $location.path('/palvelut_paavalikko').replace();
                }, 4000);
            });
        }
        
    }
    
    function searchCategory(categoryName)
    {
        console.log('serviceDeleteEditController/searchCategory');
        
        $scope.serviceCategories = [
            {name: 'Hiusten leikkaukset'},
            {name: 'Kampaukset'},
            {name: 'Permanentit'},
            {name: 'Hiusten värjäys'},
            {name: 'Monisävyvärjäys (kahdella sävyllä)'},
            {name: 'Erikoistyön lisä'},
            {name: 'Muut'},
            {name: 'Ripset ja kulmat'},
            {name: 'Paketit'},
            {name: 'Parturi'}
        ];
        
        var index = -1;
        for (var i = 0; $scope.serviceCategories.length; i++){
            if ($scope.serviceCategories[i].name === categoryName){
                index = i;
                break;
            }
        }
        
        $scope.selectedCaterogy = $scope.serviceCategories[index];
    }
    
    function selectDescription(category, description)
    {
        console.log('serviceDeleteEditController/selectDescription');
        
        switch(category){
            case 'Kampaukset':
                $scope.serviceDescriptions = [
                    {name: 'Föönikampaus'},
                    {name: 'Nutturakampaus'},
                    {name: 'Letti / muotoon kuivaus'},
                    {name: 'Juhlanuttura'},
                    {name: 'Juhla/morsiuskampaus (lyhyet)'},
                    {name: 'Juhla/morsiuskampaus (pitkät)'}
                ];
                break;
            case 'Permanentit':
                $scope.serviceDescriptions = [
                    {name: 'Permanentti, lyhyet hiukset'},
                    {name: 'Permanentti, puolipitkät hiukset'},
                    {name: 'Permanentti, pitkät hiukset'},
                    {name: 'Permanentti, erikoispitkät'},
                    {name: 'Osapermanentti'}
                ];
                break;
            case 'Hiusten värjäys':
                $scope.serviceDescriptions = [
                    {name: 'Väri, lyhyet hiukset'},
                    {name: 'Väri, puolipitkät hiukset'},
                    {name: 'Väri, pitkät hiukset'},
                    {name: 'Tyvivärjäys'},
                ];
                break;
            case 'Monisävyvärjäys (kahdella sävyllä)':
                $scope.serviceDescriptions = [
                    {name: 'Monisävyväri, lyhyet hiukset'},
                    {name: 'Monisävyväri, puolipitkät hiukset'},
                    {name: 'Monisävyväri, pitkät hiukset'},
                    {name: 'Enemmän kuin kaksi väriä'}
                ];
                break;
            case 'Erikoistyön lisä':
                $scope.serviceDescriptions = [
                    {name: 'Erikoistyönlisä, lyhyet hiukset'},
                    {name: 'Erikoistyönlisä, puolipitkät hiukset'},
                    {name: 'Erikoistyönlisä, pitkät hiukset'}
                ];
                break;
            case 'Muut':
                $scope.serviceDescriptions = [
                    {name: 'Hiusten pesu/hoito'},
                    {name: 'Haudehoito'},
                    {name: 'Muotoon kuivatus'},
                    {name: 'Tuntiveloitus'}
                ];
                break;
            case 'Ripset ja kulmat':
                $scope.serviceDescriptions = [
                    {name: 'Ripsien värjäys'},
                    {name: 'Kulmien värjäys'},
                    {name: 'Kulmakarvojen muotoilu ja värjäys'},
                    {name: 'Ripsien ja kulmien värjäys, muotoilu'},
                    {name: 'Kulmien muotoilu'}
                ];
                break;
            case 'Paketit':
                $scope.serviceDescriptions = [
                    {name: 'Väri + leikkaus (lyhyet hiukset)'},
                    {name: 'Väri + leikkaus (puolipitkät hiukset)'},
                    {name: 'Väri + leikkaus (pitkät hiukset)'},
                    {name: 'Permis + leik (lyhyet hiukset)'},
                    {name: 'Permis + leik (puolipitkät hiukset)'},
                    {name: 'Permis + leik (pitkät hiuket)'},
                    {name: 'Permis + kevytväri + leikkaus (lyhyet hiukset)'},
                    {name: 'Permis + kevytväri + leikkaus (puolipitkät hiukset)'},
                    {name: 'Permis + kevytväri + leikkaus (pitkät hiukset)'},
                    {name: 'Pesu + leikkaus'},
                    {name: 'Pesu + leikkaus + kulmat'},
                    {name: 'Pesu + leikkaus + kulmat&ripset'},
                    {name: 'Leikkaus + Kulmat (ja ripset)'},
                    {name: 'Tyviväri + Leikkaus'},
                    {name: 'Väri + Leikkaus + Kulmat ja / tai ripset'}
                ];
                break;
            case 'Parturi':
                $scope.serviceDescriptions = [];
                break;
            default:
                $scope.serviceDescriptions = [
                    {name: 'Hiustenleikkaus 0-20 min'},
                    {name: 'Hiusten leikkaus 20-30 min'},
                    {name: 'Hiusten leikkaus 30-45 min'},
                    {name: 'Hiusten leikkaus 45-60 min'},
                    {name: 'Lapset (alle 7 v)'},
                    {name: 'Koneleikkaus, otsa ja niska'},
                    {name: 'Parran muotoilu'},
                    {name: 'Viiksien muotoilu'}
                ];
                break;
        }
        
        if (category != 'Parturi'){
            var index = -1;
            for (var i = 0; $scope.serviceCategories.length; i++){
                if ($scope.serviceDescriptions[i].name === description){
                    index = i;
                    break;
                }
            }

            $scope.selectedDescription = $scope.serviceDescriptions[index];
        }
        
    }
    
    
});
