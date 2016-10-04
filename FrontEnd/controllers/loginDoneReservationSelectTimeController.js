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
    //$scope.ev = null;
    $scope.numberOfBookingTimes = null;
    
    customerDataFactory.getCustomer(dataCallBackCustomer);
    
    function dataCallBackCustomer(dataArray){
        console.log('loginDoneReservationSelectTimeController/dataCallBackCustomer');
        
        $scope.customerData = dataArray;
        console.log('$scope.customerData');
        console.log($scope.customerData);
    }
    
    companyDataFactory.getInformation(dataCallbackCompany);
    
    function dataCallbackCompany(dataArray){
        console.log('loginDoneReservationSelectTimeController/dataCallbackCompany');
        console.log("dataArray[0]");
        console.log(dataArray[0]);
    
        $scope.companyData = dataArray;
        console.log("$scope.companyData[0].timeRaster: " + $scope.companyData[0].timeRaster);
        
        createBookingTimes(dataArray[0]);
    }
    
    //employeeDataFactory.getAll(dataCallBackEmployees); // EI TARVITSE !!!
    
    function dataCallBackEmployees(dataArray){
        console.log('loginDoneReservationSelectTimeController/dataCallBackEmployees');
        console.log("dataArray");
        console.log(dataArray);
    
        //$scope.employeeData = dataArray;
    }
    
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
    
    function datePickerValue(dateAsString){
        console.log('loginDoneReservationSelectTimeController/datePickerValue');
        
        $scope.selectedDate = dateAsString;
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
        
        $scope.numberOfBookingTimes = 0;
        
        $scope.bookingTimes.push(companyData.openingTime);
        $scope.numberOfBookingTimes += 1;
        
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
                $scope.numberOfBookingTimes += 1;
            } else if (rule_hours && rule_minutes) {
                $scope.bookingTimes.push(newTime);
                $scope.numberOfBookingTimes += 1;
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
            
            console.log('$scope.numberOfBookingTimes');
            console.log($scope.numberOfBookingTimes);
            
            var timeStart2 = createStartTimeStamp2($scope.selectedDate, myRow, taysija_15min_jaksoja);
            console.log('timeStart2 :' + timeStart2);
            
            var timeEnd2 = createEndTimeStamp2($scope.selectedDate, myRow, taysija_15min_jaksoja);
            console.log('timeEnd2 :' + timeEnd2);
            
            console.log('myCol: ' + myCol);
            console.log('$scope.employeeData[myCol-1]: ');
            console.log($scope.employeeData[myCol-1]);
            
            temp = {
              startTime: timeStart2,
              endTime: timeEnd2,
              employee: $scope.employeeData[myCol-1]._id,
              customer: $scope.customerData[0]._id,
              service: $scope.selectedService._id
            };
            
            console.log('temp');
            console.log(temp);
            
            
            var waitPromise = reservationDataFactory.insertData(temp);
            
            waitPromise.then(function(response){
                // queries.js/exports.saveNewReservation: palauttaa data nimisen muuttujan responsessa.
                // Talletetaan se reservationDataFactory.array:hyn

                console.log('reservationSelectTimeController/tableClicked/waitPromise:success');
                console.log(response.data);

                reservationDataFactory.array.push(response.data);
                Flash.create('success', 'Uusi varaus lisätty', 'custom-class');

                $timeout(function(){
                    //$location.path('/palvelun_valinta_sisaankirjauduttu').replace();
                }, 2000);
            
            },function(error){

                console.log('reservationSelectTimeController/tableClicked/waitPromise:fail');
                console.log(error.message);

                Flash.create('warning', 'Varauksen lisäys epäonnistui!', 'custom-class');

                $timeout(function(){
                    //$location.path('/palvelun_valinta_sisaankirjauduttu').replace();
                }, 2000);
            });
            
        }
        
    }
    
    function createStartTimeStamp2(date, bookingTableStartIndex, numberOf15minTimeSlots){
        console.log("loginDoneReservationSelectTimeController/createStartTimeStamp2");
        
        var endIndex = bookingTableStartIndex + numberOf15minTimeSlots;
        console.log('endIndex: ' + endIndex);
        var timeStamp = "0000-00-00T00:00:00Z";
        
        if (endIndex > $scope.numberOfBookingTimes - 1){
            Flash.create('danger','Pyydetty palvelu vie niin kauan, että yrityksen sulkemisaika tulee vastaan!', 'custom-class'); 
        } else {
            var time = $scope.bookingTimes[bookingTableStartIndex];
            timeStamp = "" + date + "T" + time + ":00Z";
        }
        
        return timeStamp;
    }
    
    function createEndTimeStamp2(date, bookingTableStartIndex, numberOf15minTimeSlots){
        console.log("loginDoneReservationSelectTimeController/createEndTimeStamp2");
        
        var endIndex = bookingTableStartIndex + numberOf15minTimeSlots;
        console.log('endIndex: ' + endIndex);
        var timeStamp = "0000-00-00T00:00:00Z";
        
        if (endIndex > $scope.numberOfBookingTimes - 1){
            Flash.create('danger','Pyydetty palvelu vie niin kauan, että yrityksen sulkemisaika tulee vastaan!', 'custom-class'); 
        } else {
            var time = $scope.bookingTimes[endIndex];
            timeStamp = "" + date + "T" + time + ":00Z";
        }
        
        return timeStamp;
    }
                  
    
});
