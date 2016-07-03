main_module.controller('reservationSelectTimeController',function($scope,$location,companyDataFactory,employeeDataFactory){
    
    console.log('reservationSelectTimeController loaded');
    
    $scope.navbarData = {
        
        urls:['#/','#/palvelun_valinta','#/ajanvaraus_ajan_valinta'],
        texts:['Etusivu','Palvelun valinta','Ajan valinta'],
        classes:['','','active']
    }
    
    $scope.selectedDate = null;
    $scope.selectedService = null;
    $scope.selectedEmployee = null;
    $scope.employeeData = [];
    //$scope.companyData = [];
    $scope.bookingTimes = [];
    $scope.ev = null;
    
    companyDataFactory.getCompanyInformation(dataCallbackCompany);
    employeeDataFactory.getEmployees(dataCallBackEmployees);
    
    initialDate();
    getInformation();
    
    
    $(document).ready(function(){
        
        console.log("reservationSelectTimeController/$(document).ready");

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
        console.log('reservationSelectTimeController/selectAnotherService');
        
        $location.path('/palvelun_valinta').replace();
    }
    
    function datePickerValue(arvo){
        console.log('reservationSelectTimeController/datePickerValue');
        
        $scope.selectedDate = arvo;
        console.log($scope.selectedDate);
    }
    
    function initialDate(){
        console.log('reservationSelectTimeController/initialDate');
        
        var date = new Date();
        $scope.selectedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        console.log($scope.selectedDate);
    }
    
    function getInformation(){
        console.log('reservationSelectTimeController/getInformation');
        
        $scope.selectedService = employeeDataFactory.selectedService;
        console.log('employeeDataFactory.selectedService');
        console.log($scope.selectedService);
    
        $scope.selectedEmployee = employeeDataFactory.selectedEmployee;
        console.log('employeeDataFactory.selectedEmployee');
        console.log($scope.selectedEmployee);
        
        if ($scope.selectedEmployee.name === 'Kuka tahansa'){
            var temp = {
                category: $scope.selectedService.category,
                description: $scope.selectedService.description
            }
            
            console.log('temp');
            console.log(temp);
            
            //employeeDataFactory.getEmployeesByServiceAndEmployeeInfo(temp, dataCallBack);
            
        } else{
            
            
        }
    }
    
    function dataCallBackEmployees(dataArray){
        console.log('reservationSelectTimeController/dataCallBackEmployees');
        console.log("dataArray");
        console.log(dataArray);
    
        $scope.employeeData = dataArray;
    }
    
    function dataCallbackCompany(dataArray){
    
        console.log('reservationSelectTimeController/dataCallbackCompany');
        console.log("dataArray[0]");
        console.log(dataArray[0]);
    
        //$scope.companyData = dataArray;
        //console.log("$scope.companyData[0].timeRaster: " + $scope.companyData[0].timeRaster);
        
        createBookingTimes(dataArray[0]);
    }
    
    function createBookingTimes(companyData){
        console.log("reservationSelectTimeController/createBookingTimes");
        
        var stopGeneration = true;
        //var time_hours = parseInt(companyData.openingTime.split(":")[0]);
        //var time_minutes = parseInt(companyData.openingTime.split(":")[1]);
        //var increment_hours = parseInt(companyData.timeRaster.split(":")[0]);
        //var increment_minutes = parseInt(companyData.timeRaster.split(":")[1]);
        
        //var closing_time_hours = parseInt(companyData.closingTime.split(":")[0]);
        //var closing_time_minutes = parseInt(companyData.closingTime.split(":")[1]);
        
        
        var time_hours = 8;
        var time_minutes = 0;
        var increment_hours = 0;
        var increment_minutes = 15;
        
        var closing_time_hours = 20;
        var closing_time_minutes = 0;
        
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
        console.log("reservationSelectTimeController/tableClicked");
        //console.log($event.target);
        
        var $td = $(event.target);
        var myCol = $td.index();
        var $tr = $td.closest('tr');
        var myRow = $tr.index();
        console.log('column: ' + myCol, 'row: ' + myRow);
    }
                  
    
});
