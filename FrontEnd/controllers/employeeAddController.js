main_module.controller('employeeAddController',function($scope,Flash,employeeDataFactory,$location,$timeout){
    
    console.log('employeeAddController loaded');
    
    $scope.navbarData = {
        
        urls:['#/sovelluksen_paasivu','#/sovelluksen_hallinnointi_paasivu','#/tyontekija_paavalikko','#/tyontekija_lisaa'],
        texts:['Poistu','Hallinnointi pääsivu','Työntekijät','Lisää työntekijä'],
        classes:['','','','active']
    }
    
    $scope.roles = [
        {name: 'Membed', value: 'member'},
        {name: 'Admin', value: 'admin'}
    ];
    
    //Funktiototeutus Save-nappulan painallukselle partial_addEmployeeView.html ikkunassa
    $scope.saveEmployeeClicked = function(){
        console.log('employeeAddController/saveEmployeeClicked');
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveEmployee').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Employee määrittelyssä database.js:ssä
        var temp = {
            name:$scope.name,
            password:$scope.passwd,
            email:$scope.emailaddr,
            role:$scope.selectedRole
        };
        
        console.log(temp);
        
        if (temp.name.length === 0 ||
            temp.password.length === 0 ||
            temp.email.length === 0){
            
            alert('Jokin kenttä tyhjä!');
            return;
        }
        
        
        var waitPromise = employeeDataFactory.insertData(temp);
        
        waitPromise.then(function(response){
            // queries.js/exports.saveNewEmployee: palauttaa data nimisen muuttujan responsessa.
            // Talletetaan se employeeDataFactory.array:hyn
            
            console.log('employeeAddController/saveEmployeeClicked/waitPromise:success');
            console.log(response.data);
            
            employeeDataFactory.array.push(response.data);
            Flash.create('success', 'Uusi työntekijä lisätty', 'custom-class');
            
            $scope.name = "";
            $scope.passwd = "";
            $scope.emailaddr = "";
            $scope.selectedRole = "";
            
            // sallitaan Save-napin painaminen
            $('#saveEmployee').attr("disabled", false);
            
            $timeout(function(){
                $location.path('/tyontekija_paavalikko').replace();
            }, 2000);
            
        },function(error){
            
            console.log('employeeAddController/saveEmployeeClicked/waitPromise:fail');
            console.log(error.message);
            
            Flash.create('warning', 'Työntekijän lisäys epäonnistui. Sähköpostiosoite oli jo käytössä!', 'custom-class');
            // sallitaan Save-napin painaminen
            $('#saveEmployee').attr("disabled", false);
            
            $timeout(function(){
                $location.path('/tyontekija_paavalikko').replace();
            }, 2000);
        });
        
    };
});
