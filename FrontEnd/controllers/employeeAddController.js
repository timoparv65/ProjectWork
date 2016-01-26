main_module.controller('employeeAddController',function($scope,Flash,employeeDataFactory,$location){
    
    console.log('employeeAddController loaded');
    
    //Funktiototeutus Save-nappulan painallukselle partial_addEmployeeView.html ikkunassa
    $scope.saveEmployeeClicked = function(){
        console.log('employeeAddController/saveEmployeeClicked');
        
        // estetään Save-napin painaminen sillä välin kun tiedot tallennetaan tietokantaan
        $('#saveEmployee').attr("disabled", true);
        
        // temp muuttujien nimet oltava samat kuin Employee määrittelyssä database.js:ssä
        var temp = {
            name:$scope.name,
            password:$scope.passwd,
            email:$scope.emailaddr
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
            // Talletetaan se employeeArray:hyn
            
            console.log('employeeAddController/saveEmployeeClicked/waitPromise:success');
            console.log(response.data);
            
            employeeDataFactory.employeeArray.push(response.data);
            Flash.create('success', 'Uusi työntekijä lisätty', 'custom-class');
            
            $scope.name = "";
            $scope.passwd = "";
            $scope.emailaddr = "";
            
            // sallitaan Save-napin painaminen
            $('#saveEmployee').attr("disabled", false);
            
            $location.path('/tyontekija_paavalikko').replace();
        },function(error){
            
            console.log('employeeAddController/saveEmployeeClicked/waitPromise:fail');
            console.log(error.message);
            
            Flash.create('warning', 'Työntekijän lisäys epäonnistui!', 'custom-class');
            // sallitaan Save-napin painaminen
            $('#saveEmployee').attr("disabled", false);
        });
        
    };
});
