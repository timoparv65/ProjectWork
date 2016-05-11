main_module.controller('serviceAddController',function($scope,employeeDataFactory,$location,Flash){
    
    console.log('serviceAddController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/sovelluksen_hallinnointi_paasivu','#/palvelut_paavalikko','#/palvelu_lisaa'],
        texts:['Poistu','Hallinnointi pääsivu','Palvelut','Lisää palvelu'],
        classes:['','','','active']
    }
    
    $scope.serviceCategories = [];
    $scope.serviceDescriptions = [];
    
    initialCategoryAndDescription();
    
    $scope.selectedCategoryCallback = function(selectedChoise){
        console.log('serviceAddController/selectedCategoryCallback');
        
        selectDescriptionBasedOnCategory(selectedChoise.name);
    }
    
    //Funktiototeutus Save-nappulan painallukselle partial_addServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        
        console.log('serviceAddController/saveServiceClicked');
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveService').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Employee määrittelyssä database.js:ssä
        var temp = {
            category:$scope.selectedCaterogy.name,
            categoryextrainfo:$scope.extracategory,
            description:$scope.selectedDescription.name,
            extrainfo:$scope.extra,
            duration:$scope.duration,
            price:$scope.servicePrice
        };
        
        console.log(temp);
        
        if (temp.category.length === 0){
            
            alert('Kategoria kenttä tyhjä!');
            return;
        }
        
        var waitPromise = employeeDataFactory.insertServiceChoiseData(temp);
        
        waitPromise.then(function(response){
            
            console.log('serviceAddController/saveServiceClicked/waitPromise:success');
            console.log(response.data);
            
            
            // queries.js/exports.saveNewService: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se serviceChoiseArray:hyn
            employeeDataFactory.serviceChoiseArray.push(response.data);
            
            initialCategoryAndDescription();
            
            $scope.selectedCaterogy = $scope.serviceCategories[0];
            $scope.extracategory = "";
            $scope.selectedDescription = $scope.serviceDescriptions[0];
            $scope.extra = "";
            $scope.duration = "";
            $scope.servicePrice = "";
            
            Flash.create('success', 'Palvelu lisättiin onnistuneesti!', 'custom-class');
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
            
            //$location.path('/palvelut_paavalikko').replace();
            
        },function(error){
            
            console.log('serviceAddController/saveServiceClicked/waitPromise:fail');
            console.log(error.message);
            
            Flash.create('danger','Palvelun lisäys epäonnistui. Koodi oli jo käytössä!', 'custom-class');
            
            // sallitaan Save-napin painaminen
            $('#saveService').attr("disabled", false);
        });
        
    }
    
    function initialCategoryAndDescription()
    {
        console.log('serviceAddController/initialCategoryAndDescription');
        
        $scope.serviceCategories = [
            {name: 'Hiusten leikkaukset'},
            {name: 'Kampaukset', extracateg: 'Kampausten hinnat riippuu pohjatyöstä ja käytetystä ajasta! Nimet, ajat ja hinnat ovat suuntaa antavia'},
            {name: 'Permanentit'},
            {name: 'Hiusten värjäys'},
            {name: 'Monisävyvärjäys (kahdella sävyllä)'},
            {name: 'Erikoistyön lisä', extracateg: 'Pigmentointi, erikoisrullaus(Spiraali permanentti), värinpoisto'},
            {name: 'Muut'},
            {name: 'Ripset ja kulmat'},
            {name: 'Paketit'},
            {name: 'Parturi'}
        ];
    
        $scope.selectedCaterogy = $scope.serviceCategories[0];

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

        $scope.selectedDescription = $scope.serviceDescriptions[0];
    }
    
    
    function selectDescriptionBasedOnCategory(choiseName)
    {
        console.log('serviceAddController/selectDescriptionBasedOnCategory');
        
        switch(choiseName){
            case 'Kampaukset':
                $scope.serviceDescriptions = [
                    {name: 'Föönikampaus'},
                    {name: 'Nutturakampaus'},
                    {name: 'Letti / muotoon kuivaus'},
                    {name: 'Juhlanuttura'},
                    {name: 'Juhla/morsiuskampaus (lyhyet)'},
                    {name: 'Juhla/morsiuskampaus (pitkät)'}
                ];
                $scope.selectedDescription = $scope.serviceDescriptions[0];
                break;
            case 'Permanentit':
                $scope.serviceDescriptions = [
                    {name: 'Permanentti, lyhyet hiukset'},
                    {name: 'Permanentti, puolipitkät hiukset'},
                    {name: 'Permanentti, pitkät hiukset'},
                    {name: 'Permanentti, erikoispitkät'},
                    {name: 'Osapermanentti'}
                ];
                $scope.selectedDescription = $scope.serviceDescriptions[0];
                break;
            case 'Hiusten värjäys':
                $scope.serviceDescriptions = [
                    {name: 'Väri, lyhyet hiukset'},
                    {name: 'Väri, puolipitkät hiukset'},
                    {name: 'Väri, pitkät hiukset'},
                    {name: 'Tyvivärjäys'},
                ];
                $scope.selectedDescription = $scope.serviceDescriptions[0];
                break;
            case 'Monisävyvärjäys (kahdella sävyllä)':
                $scope.serviceDescriptions = [
                    {name: 'Monisävyväri, lyhyet hiukset'},
                    {name: 'Monisävyväri, puolipitkät hiukset'},
                    {name: 'Monisävyväri, pitkät hiukset'},
                    {name: 'Enemmän kuin kaksi väriä'}
                ];
                $scope.selectedDescription = $scope.serviceDescriptions[0];
                break;
            case 'Erikoistyön lisä':
                $scope.serviceDescriptions = [
                    {name: 'Erikoistyönlisä, lyhyet hiukset'},
                    {name: 'Erikoistyönlisä, puolipitkät hiukset'},
                    {name: 'Erikoistyönlisä, pitkät hiukset'}
                ];
                $scope.selectedDescription = $scope.serviceDescriptions[0];
                break;
            case 'Muut':
                $scope.serviceDescriptions = [
                    {name: 'Hiusten pesu/hoito'},
                    {name: 'Haudehoito'},
                    {name: 'Muotoon kuivatus'},
                    {name: 'Tuntiveloitus'}
                ];
                $scope.selectedDescription = $scope.serviceDescriptions[0];
                break;
            case 'Ripset ja kulmat':
                $scope.serviceDescriptions = [
                    {name: 'Ripsien värjäys'},
                    {name: 'Kulmien värjäys'},
                    {name: 'Kulmakarvojen muotoilu ja värjäys'},
                    {name: 'Ripsien ja kulmien värjäys, muotoilu'},
                    {name: 'Kulmien muotoilu'}
                ];
                $scope.selectedDescription = $scope.serviceDescriptions[0];
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
                $scope.selectedDescription = $scope.serviceDescriptions[0];
                break;
            case 'Parturi':
                $scope.serviceDescriptions = [
                    {name: ' '}
                ];
                $scope.selectedDescription = $scope.serviceDescriptions[0];
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
                $scope.selectedDescription = $scope.serviceDescriptions[0];
                break;
        }
    }
    
});