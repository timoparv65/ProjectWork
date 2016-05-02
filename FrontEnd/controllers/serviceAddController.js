main_module.controller('serviceAddController',function($scope,employeeDataFactory,$location,Flash){
    
    console.log('serviceAddController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/sovelluksen_hallinnointi_paasivu','#/palvelut_paavalikko','#/palvelu_lisaa'],
        texts:['Poistu','Hallinnointi pääsivu','Palvelut','Lisää palvelu'],
        classes:['','','','active']
    }
    
    $scope.serviceCategories = [
        {name: 'Hiusten leikkaukset', value: 'Hiusten leikkaukset'},
        {name: 'Kampaukset', value: 'Kampaukset'},
        {name: 'Permanentit', value: 'Permanentit'},
        {name: 'Hiusten värjäys', value: 'Hiusten värjäys'},
        {name: 'Monisävyvärjäys (kahdella sävyllä)', value: 'Monisävyvärjäys (kahdella sävyllä)'},
        {name: 'Erikoistyön lisä', value: 'Erikoistyön lisä'},
        {name: 'Muut', value: 'Muut'},
        {name: 'Ripset ja kulmat', value: 'Ripset ja kulmat'},
        {name: 'Paketit', value: 'Paketit'}
    ];
    
    $scope.serviceDescriptions = [
        {name: 'Hiustenleikkaus 0-20 min', value: 'Hiustenleikkaus 0-20 min'},
        {name: 'Hiusten leikkaus 20-30 min', value: 'Hiusten leikkaus 20-30 min'},
        {name: 'Hiusten leikkaus 30-45 min', value: 'Hiusten leikkaus 30-45 min'},
        {name: 'Hiusten leikkaus 45-60 min', value: 'Hiusten leikkaus 45-60 min'},
        {name: 'Lapset (alle 7 v)', value: 'Lapset (alle 7 v)'},
        {name: 'Koneleikkaus, otsa ja niska', value: 'Koneleikkaus, otsa ja niska'},
        {name: 'Parran muotoilu', value: 'Parran muotoilu'},
        {name: 'Viiksien muotoilu', value: 'Viiksien muotoilu'},
        {name: 'Föönikampaus', value: 'Föönikampaus'},
        {name: 'Nutturakampaus', value: 'Nutturakampaus'},
        {name: 'Letti / muotoon kuivaus', value: 'Letti / muotoon kuivaus'},
        {name: 'Juhlanuttura', value: 'Juhlanuttura'},
        {name: 'Juhla/morsiuskampaus (lyhyet)', value: 'Juhla/morsiuskampaus (lyhyet)'},
        {name: 'Juhla/morsiuskampaus (pitkät)', value: 'Juhla/morsiuskampaus (pitkät)'},
        {name: 'Permanentti, lyhyet hiukset', value: 'Permanentti, lyhyet hiukset'},
        {name: 'Permanentti, puolipitkät hiukset', value: 'Permanentti, puolipitkät hiukset'},
        {name: 'Permanentti, pitkät hiukset', value: 'Permanentti, pitkät hiukset'},
        {name: 'Permanentti, erikoispitkät', value: 'Permanentti, erikoispitkät'},
        {name: 'Osapermanentti', value: 'Osapermanentti'},
        {name: 'Väri, lyhyet hiukset', value: 'Väri, lyhyet hiukset'},
        {name: 'Väri, puolipitkät hiukset', value: 'Väri, puolipitkät hiukset'},
        {name: 'Väri, pitkät hiukset', value: 'Väri, pitkät hiukset'},
        {name: 'Tyvivärjäys', value: 'Tyvivärjäys'},
        {name: 'Monisävyväri, lyhyet hiukset', value: 'Monisävyväri, lyhyet hiukset'},
        {name: 'Monisävyväri, puolipitkät hiukset', value: 'Monisävyväri, puolipitkät hiukset'},
        {name: 'Monisävyväri, pitkät hiukset', value: 'Monisävyväri, pitkät hiukset'},
        {name: 'Enemmän kuin kaksi väriä', value: 'Enemmän kuin kaksi väriä'},
        {name: 'Pigmentointi, erikoisrullaus(Spiraali permanentti), värinpoisto', value: 'Pigmentointi, erikoisrullaus(Spiraali permanentti), värinpoisto'},
        {name: 'Erikoistyönlisä, lyhyet hiukset', value: 'Erikoistyönlisä, lyhyet hiukset'},
        {name: 'Erikoistyönlisä, puolipitkät hiukset', value: 'Erikoistyönlisä, puolipitkät hiukset'},
        {name: 'Erikoistyönlisä, pitkät hiukset', value: 'Erikoistyönlisä, pitkät hiukset'},
        {name: 'Hiusten pesu/hoito', value: 'Hiusten pesu/hoito'},
        {name: 'Haudehoito', value: 'Haudehoito'},
        {name: 'Muotoon kuivatus', value: 'Muotoon kuivatus'},
        {name: 'Tuntiveloitus', value: 'Tuntiveloitus'},
        {name: 'Ripsien värjäys', value: 'Ripsien värjäys'},
        {name: 'Kulmien värjäys', value: 'Kulmien värjäys'},
        {name: 'Kulmakarvojen muotoilu ja värjäys', value: 'Kulmakarvojen muotoilu ja värjäys'},
        {name: 'Ripsien ja kulmien värjäys, muotoilu', value: 'Ripsien ja kulmien värjäys, muotoilu'},
        {name: 'Kulmien muotoilu', value: 'Kulmien muotoilu'},
        {name: 'Väri + leikkaus (lyhyet hiukset)', value: 'Väri + leikkaus (lyhyet hiukset)'},
        {name: 'Väri + leikkaus (puolipitkät hiukset)', value: 'Väri + leikkaus (puolipitkät hiukset)'},
        {name: 'Väri + leikkaus (pitkät hiukset)', value: 'Väri + leikkaus (pitkät hiukset)'},
        {name: 'Permis + leik (lyhyet hiukset)', value: 'Permis + leik (lyhyet hiukset)'},
        {name: 'Permis + leik (puolipitkät hiukset)', value: 'Permis + leik (puolipitkät hiukset)'},
        {name: 'Permis + leik (pitkät hiuket)', value: 'Permis + leik (pitkät hiuket)'},
        {name: 'Permis + kevytväri + leikkaus (lyhyet hiukset)', value: 'Permis + kevytväri + leikkaus (lyhyet hiukset)'},
        {name: 'Permis + kevytväri + leikkaus (puolipitkät hiukset)', value: 'Permis + kevytväri + leikkaus (puolipitkät hiukset)'},
        {name: 'Permis + kevytväri + leikkaus (pitkät hiukset)', value: 'Permis + kevytväri + leikkaus (pitkät hiukset)'},
        {name: 'Pesu + leikkaus', value: 'Pesu + leikkaus'},
        {name: 'Pesu + leikkaus + kulmat', value: 'Pesu + leikkaus + kulmat'},
        {name: 'Pesu + leikkaus + kulmat&ripset', value: 'Pesu + leikkaus + kulmat&ripset'},
        {name: 'Leikkaus + Kulmat (ja ripset)', value: 'Leikkaus + Kulmat (ja ripset)'},
        {name: 'Tyviväri + Leikkaus', value: 'Tyviväri + Leikkaus'},
        {name: 'Väri + Leikkaus + Kulmat ja / tai ripset', value: 'Väri + Leikkaus + Kulmat ja / tai ripset'}
    ];
    
    //Funktiototeutus Save-nappulan painallukselle partial_addServiceView.html ikkunassa
    $scope.saveServiceClicked = function(){
        
        console.log('serviceAddController/saveServiceClicked');
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveService').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Employee määrittelyssä database.js:ssä
        var temp = {
            category:$scope.category,
            description:$scope.description,
            duration:$scope.duration,
            code:$scope.code
        };
        
        console.log(temp);
        
        if (temp.category.length === 0 ||
            temp.description.length === 0 ||
            temp.duration.length === 0 ||
            temp.code.length === 0){
            
            alert('Jokin kenttä tyhjä!');
            return;
        }
        
        var waitPromise = employeeDataFactory.insertServiceChoiseData(temp);
        
        waitPromise.then(function(response){
            
            console.log('serviceAddController/saveServiceClicked/waitPromise:success');
            console.log(response.data);
            
            
            // queries.js/exports.saveNewService: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se serviceChoiseArray:hyn
            employeeDataFactory.serviceChoiseArray.push(response.data);
            
            $scope.category = "";
            $scope.description = "";
            $scope.duration = "";
            $scope.code = "";
            
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
});