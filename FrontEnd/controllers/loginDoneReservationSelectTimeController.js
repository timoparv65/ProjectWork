main_module.controller('loginDoneReservationSelectTimeController',function($scope,$location,companyDataFactory,employeeDataFactory,serviceDataFactory,reservationDataFactory,customerDataFactory,$timeout, Flash){
    
    console.log('loginDoneReservationSelectTimeController loaded');
    
    $scope.navbarData = {
        
        urls:['/logout','#/palvelun_valinta_sisaankirjauduttu','#/ajanvaraus_sisaankirjauduttu'],
        texts:['Poistu','Palvelun valinta','Ajan valinta'],
        classes:['','','active']
    }
    
    $scope.selectedDate = null;
    $scope.selectedService = null;
    $scope.selectedEmployee = null;
    $scope.employeeData = [];
    $scope.companyData = [];
    $scope.customerData = [];
    $scope.bookingTimes = [];
    $scope.ev = null;
    
    customerDataFactory.getCustomer(dataCallBackCustomer);
    companyDataFactory.getInformation(dataCallbackCompany);
    employeeDataFactory.getAll(dataCallBackEmployees);
    
    initialDate();
    getInformation();
    
    
    $(document).ready(function(){
        
        console.log("loginDoneReservationSelectTimeController/$(document).ready");

        $("#datepicker").datepicker(
                                    {   onSelect: function(dateText, inst) {
                                            var dateAsString = dateText;
                                            console.log("dateAsString: " + dateAsString);
                                            datePickerValue(dateAsString);
                                        },
                                        dateFormat: "yy-mm-dd",
                                        showWeek: true,
                                        firstDay: 1,
                                        beforeShowDay: $.datepicker.noWeekends,
                                        altField: "#actualDate"
                                    },
                                    $.datepicker.regional[ "fi" ]
        );
          
    });
    
    
    $scope.selectAnotherService = function(){
        console.log('loginDoneReservationSelectTimeController/selectAnotherService');
        
        $location.path('/palvelun_valinta_sisaankirjauduttu').replace();
    }
    
    function datePickerValue(arvo){
        console.log('loginDoneReservationSelectTimeController/datePickerValue');
        
        $scope.selectedDate = arvo;
        console.log($scope.selectedDate);
    }
    
    function initialDate(){
        console.log('loginDoneReservationSelectTimeController/initialDate');
        
        var date = new Date();
        $scope.selectedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        console.log($scope.selectedDate);
    }
    
    function getInformation(){
        console.log('loginDoneReservationSelectTimeController/getInformation');
        
        $scope.selectedService = serviceDataFactory.selected;
        console.log('serviceDataFactory.selected');
        console.log($scope.selectedService);
    
        $scope.selectedEmployee = employeeDataFactory.selected;
        console.log('employeeDataFactory.selected');
        console.log($scope.selectedEmployee);
        
        if ($scope.selectedEmployee.name === 'Kuka tahansa'){
            var temp = {
                id: $scope.selectedService._id
            }
            
            console.log('työntekijä: kuka tahansa');
            console.log('temp');
            console.log(temp);
            
            employeeDataFactory.getByService(temp, dataCallBackService);
            
        } else{

            var temp = {
                email: $scope.selectedEmployee.email
            }
            
            console.log('työntekijä: ' + $scope.selectedEmployee.name);
            console.log('temp');
            console.log(temp);
            
            if ($scope.selectedService != null){
                employeeDataFactory.getByEmail(temp, dataCallBackService);
            }
        }
    }
    
    function dataCallBackCustomer(dataArray){
        console.log('loginDoneReservationSelectTimeController/dataCallBackCustomer');
        
        $scope.customerData = dataArray;
        console.log('$scope.customerData');
        console.log($scope.customerData);
    }
    
    function dataCallBackEmployees(dataArray){
        console.log('loginDoneReservationSelectTimeController/dataCallBackEmployees');
        console.log("dataArray");
        console.log(dataArray);
    
        //$scope.employeeData = dataArray;
    }
    
    function dataCallbackCompany(dataArray){
        console.log('loginDoneReservationSelectTimeController/dataCallbackCompany');
        console.log("dataArray[0]");
        console.log(dataArray[0]);
    
        $scope.companyData = dataArray;
        console.log("$scope.companyData[0].timeRaster: " + $scope.companyData[0].timeRaster);
        
        createBookingTimes(dataArray[0]);
    }
    
    function dataCallBackService(dataArray){
        console.log('loginDoneReservationSelectTimeController/dataCallBackService');
        console.log("dataArray");
        console.log(dataArray);
        
        $scope.employeeData = dataArray;
    }
    
    function createBookingTimes(companyData){
        console.log("loginDoneReservationSelectTimeController/createBookingTimes");
        
        var stopGeneration = true;
        var time_hours = parseInt(companyData.openingTime.split(":")[0]);
        var time_minutes = parseInt(companyData.openingTime.split(":")[1]);
        var increment_hours = parseInt(companyData.timeRaster.split(":")[0]);
        var increment_minutes = parseInt(companyData.timeRaster.split(":")[1]);
        
        var closing_time_hours = parseInt(companyData.closingTime.split(":")[0]);
        var closing_time_minutes = parseInt(companyData.closingTime.split(":")[1]);
        
        
        //var time_hours = 8;
        //var time_minutes = 0;
        //var increment_hours = 0;
        //var increment_minutes = 15;
        
        //var closing_time_hours = 20;
        //var closing_time_minutes = 0;
        
        $scope.bookingTimes.push(companyData.openingTime);
        
        do{
            time_hours += increment_hours;
            time_minutes += increment_minutes;
            
            if (time_minutes > 59){
                time_hours += 1;
                time_minutes -= 60;
            }
            
            if (time_hours > 23){
                time_hours = 0;
            }
            
            var newTime = "";
            if (time_hours < 10){
                newTime += "0";
            }
            
            newTime += time_hours.toString() + ":";
            
            if (time_minutes < 10){
                newTime += "0";
            }
            
            newTime += time_minutes.toString();
            
            var rule_hours = time_hours === closing_time_hours;
            var rule_minutes = time_minutes <= closing_time_minutes;
            if (time_hours < closing_time_hours){
                $scope.bookingTimes.push(newTime);
            } else if (rule_hours && rule_minutes) {
                $scope.bookingTimes.push(newTime);
            } else {
                stopGeneration = false;
            }
            
        } while(stopGeneration);
        
        //console.log("$scope.bookingTimes");
        //console.log($scope.bookingTimes); 
    }
    
    
    $scope.tableClicked = function($event){
        console.log("loginDoneReservationSelectTimeController/tableClicked");
        //console.log($event.target);
        
        var $td = $(event.target);
        var myCol = $td.index();
        var $tr = $td.closest('tr');
        var myRow = $tr.index();
        console.log('column: ' + myCol, 'row: ' + myRow);
        
        if (myCol > 0)
        {
            console.log('$scope.selectedDate');
            console.log($scope.selectedDate);
            console.log('$scope.selectedService');
            console.log($scope.selectedService);
            console.log('$scope.selectedEmployee');
            console.log($scope.selectedEmployee);
            
            if ($scope.selectedEmployee.name === 'Kuka tahansa'){
                console.log('työntekijä: ' + $scope.employeeData[myCol-1].name);
            } else {
                console.log('työntekijä: ' + $scope.selectedEmployee.name);
            }
            console.log('aika: ' + $scope.bookingTimes[myRow]);
            
            var r1 = $scope.selectedService.duration / 15;
            var taysija_15min_jaksoja = Math.ceil(r1);
            console.log('vie täysiä 15 min jaksoja: ' + taysija_15min_jaksoja);
            
            var timeStart = createTimeStamp($scope.selectedDate, $scope.bookingTimes[myRow]);
            console.log('timeStart :' + timeStart);
            
            temp = {
              startTime: timeStart,
              endTime: timeStart,
                employee: 10
            };
            /*
            var waitPromise = reservationDataFactory.insertData(temp);
            
            waitPromise.then(function(response){
                // queries.js/exports.saveNewReservation: palauttaa data nimisen muuttujan responsessa.
                // Talletetaan se reservationDataFactory.array:hyn

                console.log('reservationSelectTimeController/tableClicked/waitPromise:success');
                console.log(response.data);

                reservationDataFactory.array.push(response.data);
                Flash.create('success', 'Uusi varaus lisätty', 'custom-class');

                $timeout(function(){
                    //$location.path('/tyontekija_paavalikko').replace();
                }, 2000);
            
            },function(error){

                console.log('reservationSelectTimeController/tableClicked/waitPromise:fail');
                console.log(error.message);

                Flash.create('warning', 'Varauksen lisäys epäonnistui!', 'custom-class');

                $timeout(function(){
                    //$location.path('/tyontekija_paavalikko').replace();
                }, 2000);
            });
            */
        }
        
    }
    
    function createTimeStamp(date, time){
        console.log("loginDoneReservationSelectTimeController/createTimeStamp");
        
        var timeStamp = "" + date + "T" + time + ":00Z";
        return timeStamp;
    }
                  
    
});
