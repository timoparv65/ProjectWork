main_module.controller('reservationController',function($scope,employeeDataFactory){
    
    console.log('reservationController loaded');
    
    $scope.employeeData = [];
    $scope.selectedEmployee = [];

    $scope.navbarData = {
        
        urls:['#/','#/ajanvaraus',"#/palvelut_ja_hinnasto",'#/yhteystiedot'],
        texts:['Etusivu','Ajanvaraus','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['','active','','']
    }
    
    $scope.message = '';
    
    $scope.services = [
        {name: 'Valitse'},
        {name: 'Hiustenleikkaus 0-20 min', category: 'Hiusten leikkaukset', duration: '20', cost: '24.40', extra: 'Suositetaan miehille'},
        {name: 'Hiusten leikkaus 20-30 min'  , category: 'Hiusten leikkaukset', duration: '30', cost: '32.10', extra: 'Tasaus'},
        {name: 'Hiusten leikkaus 30-45 min', category: 'Hiusten leikkaukset', duration: '45', cost: '35.40', extra: 'Muotoon leikkaus'},
        {name: 'Hiusten leikkaus 45-60 min', category: 'Hiusten leikkaukset', duration: '60',cost: '46.40', extra: 'Mallin muutos'},
        {name: 'Lapset (alle 7 v)', category: 'Hiusten leikkaukset', duration: '20', cost: '19.50'},
        {name: 'Koneleikkaus, otsa ja niska', category: 'Hiusten leikkaukset', duration: '10', cost: '13.20'},
        {name: 'Parran muotoilu', category: 'Hiusten leikkaukset', duration: '10', cost: '12.80'},
        {name: 'Viiksien muotoilu', category: 'Hiusten leikkaukset', duration: '5', cost: '5.60'},
        {name: 'Föönikampaus', category: 'Kampaukset', duration: '30', cost: '25.50', extra: 'Max. 30 min'},
        {name: 'Nutturakampaus', category: 'Kampaukset', duration: '30', cost: '38.00', extra: 'Max. 30 min'},
        {name: 'Letti / muotoon kuivaus', category: 'Kampaukset', duration: '15', cost: '16.80', extra: 'Esim. värjäyksen tai permanentin yhteydessä perittävä maksu, jos kuivataan, mutta ei tule leikkausta'},
        {name: 'Juhlanuttura', category: 'Kampaukset', duration: '60', cost: '65.90', extra: 'Max. 1h'},
        {name: 'Juhla/morsiuskampaus (lyhyet)', category: 'Kampaukset', duration: '75', cost: '80.50', extra: 'Sis. harjoitus kampaus'},
        {name: 'Juhla/morsiuskampaus (pitkät)', category: 'Kampaukset', duration: '75', cost: '110.50', extra: 'Sis. harjoitus kampaus'},
        {name: 'Permanentti, lyhyet hiukset', category: 'Permanentit', duration: '30', cost: '59.10'},
        {name: 'Permanentti, puolipitkät hiukset', category: 'Permanentit', duration: '30', cost: '66.10'},
        {name: 'Permanentti, pitkät hiukset', category: 'Permanentit', duration: '45', cost: '88.00'},
        {name: 'Permanentti, erikoispitkät', category: 'Permanentit', duration: '45', cost: '98.20'},
        {name: 'Osapermanentti', category: 'Permanentit', duration: '30', cost: '50.80', extra: 'Vain päälliosaan tehtävä kihara käsittely'},
        {name: 'Väri, lyhyet hiukset', category: 'Hiusten värjäys', duration: '30', cost: '49.50'},
        {name: 'Väri, puolipitkät hiukset', category: 'Hiusten värjäys', duration: '30', cost: '62.60'},
        {name: 'Väri, pitkät hiukset', category: 'Hiusten värjäys', duration: '30', cost: '75.30'},
        {name: 'Tyvivärjäys', category: 'Hiusten värjäys', duration: '30', cost: '46.50'},
        {name: 'Monisävyväri, lyhyet hiukset', category: 'Monisävyvärjäys (kahdella sävyllä)', duration: '45', cost: '66.60'}
    ];
    
    $scope.selectedServ = $scope.services[0];
    
    employeeDataFactory.getEmployees(dataCallback);
    
    function dataCallback(dataArray){
    
        console.log('reservationController/dataCallback');
    
        $scope.employeeData = dataArray;
        
        var temp = {
            name: 'Kuka tahansa',
            value: 'Kuka tahansa'
        }
        
        $scope.selectedEmployee.push(temp);
        for(var i = 0; i < dataArray.length; i++)
        {
            var empl = dataArray[i];
            var temp = {
                name: empl.name,
                value: empl.name
            }
            
            $scope.selectedEmployee.push(temp);
        }
        // This one preselected
        $scope.selectedEmpl = $scope.selectedEmployee[0];
        
    }
    
    $scope.selectServiceClicked = function(){
        console.log('reservationController/selectServiceClicked');
        
        console.log('$scope.selectedEmpl');
        console.log($scope.selectedEmpl.name);
        
        console.log('$scope.selectedServ.name');
        console.log($scope.selectedServ.name);
        
        if ($scope.selectedServ.name === 'Valitse') {
            $scope.message = "Valitse palvelu";
        } else {
            $scope.message = 'eteenpäin';
        }
    }

});