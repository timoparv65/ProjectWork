main_module.controller('mainController',function($scope,companyDataFactory,employeeDataFactory){
    
    console.log('mainController loaded');
    
    
    $scope.employeeData = [];
    $scope.companyData = [];
    $scope.bookingTimes = [];
    $scope.reservationTable = [];
    
    $scope.selectedDate = null;
    console.log("1) $scope.selectedDate");
    console.log($scope.selectedDate);
    
    getInitialDate();
    console.log("2) $scope.selectedDate");
    console.log($scope.selectedDate);
    
    companyDataFactory.getCompanyInformation(dataCallbackCompany);
    
    employeeDataFactory.getEmployees(dataCallbackEmployee);
    
    $(document).ready(function(){
        
        console.log("mainController/$(document).ready");

        $("#datepicker").datepicker(
                                    {   onSelect: function(dateText, inst) {
                                            //var date = $(this).val();
                                     
                                            var dateAsString = dateText; //the first parameter of this function
                                            var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
                                            console.log("dateAsString: " + dateAsString);
                                            tulostanDatepickerArvon(dateAsString);
                                            console.log("dateAsObject");
                                            console.log(dateAsObject);
                                            tulostan2DatepickerArvon(dateAsObject);
                                        },
                                        dateFormat: "yy-mm-dd",
                                        beforeShowDay: $.datepicker.noWeekends,
                                        altField: "#actualDate"
                                    },
                                    $.datepicker.regional[ "fi" ]
        );
        
        
    });

    
    function dataCallbackCompany(dataArray){
    
        console.log('mainController/dataCallbackCompany');
        console.log("dataArray[0]");
        console.log(dataArray[0]);
    
        $scope.companyData = dataArray;


        var geocoder = new google.maps.Geocoder();

        // kts. GeocoderRequest object specification
        var geoCodeRequest = {
            //address:my_address
            address:$scope.companyData[0].address + "," + $scope.companyData[0].city
        }

        geocoder.geocode(geoCodeRequest,function(response,status){

            if(status === google.maps.GeocoderStatus.OK){

                console.log("response");
                console.log(response);
                var data = response[0];
                var lat = data.geometry.location.lat();
                var lng = data.geometry.location.lng();
                var latlng = new google.maps.LatLng(lat,lng);

                var mapProp = {
                  center:latlng,
                  zoom:15,
                  mapTypeId:google.maps.MapTypeId.ROADMAP
               };

               var map = new google.maps.Map(my_map,mapProp);

                var marker = new google.maps.Marker({
                    position: latlng, 
                    map: map,  // mihin karttaan piirretään
                    title:"Parturi-kampaamo " + $scope.companyData[0].name + ",\n" + $scope.companyData[0].address
                });


            }else{

                alert(status);
            }

        });
        
        
        
        console.log("$scope.companyData[0].timeRaster: " + $scope.companyData[0].timeRaster);
        
        createBookingTimes();
    }
    
    
    function dataCallbackEmployee(dataArray){
    
        console.log('mainController/dataCallbackEmployee');
        console.log(dataArray);
    
        $scope.employeeData = dataArray;
        
    }
    
    /*
    $scope.klikattuSolua = function($event){
        console.log("mainController/klikattuSolua");
        
    }*/
    
    function tulostanDatepickerArvon(arvo){
        console.log('mainController/tulostanDatepickerArvon');
        console.log("arvo: " + arvo);
        $scope.selectedDate = arvo;
        console.log("3) $scope.selectedDate");
        console.log($scope.selectedDate);
    }
    
    function tulostan2DatepickerArvon(arvo){
        console.log('mainController/tulostan2DatepickerArvon');
        console.log("arvo: " + arvo);
    }
    
    
    
    function createBookingTimes(){
        
        console.log("mainController/createBookingTimes");
        
        var stopGeneration = true;
        var time_hours = parseInt($scope.companyData[0].openingTime.split(":")[0]);
        var time_minutes = parseInt($scope.companyData[0].openingTime.split(":")[1]);
        var increment_hours = parseInt($scope.companyData[0].timeRaster.split(":")[0]);
        var increment_minutes = parseInt($scope.companyData[0].timeRaster.split(":")[1]);
        
        var closing_time_hours = parseInt($scope.companyData[0].closingTime.split(":")[0]);
        var closing_time_minutes = parseInt($scope.companyData[0].closingTime.split(":")[1]);
        
        $scope.bookingTimes.push($scope.companyData[0].openingTime);
        
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
    
    
    function getInitialDate(){
        
        console.log("mainController/getInitialDate");
        
        var today = new Date();
        //console.log("today");
        //console.log(today);
        var year = today.getFullYear();
        //console.log("year");
        //console.log(year);
        var month = today.getMonth();
        //console.log("month");
        //console.log(month);
        var day = today.getDate();
        //console.log("day");
        //console.log(day);
        
        var dateStamp = year.toString();
        month = month + 1;
        if (month < 10){
            dateStamp += "-" + "0" + month.toString() + "-";
        }else{
            dateStamp += "-" + month.toString() + "-";
        }
        dateStamp += day.toString();
        
        //console.log("dateStamp " + dateStamp);
        
        $scope.selectedDate = dateStamp;
    }
    /*
    function createReservationTable(){
        
        console.log("mainController/createReservationTable");
        
        // yksi taulukon rivi sisältää tiedot:
        // - kellonaika (sarake 1)
        // - 1. työntekijän vapaa/varattu, työntekijän id (sarake 2)
        
        for (var i = 0; i < $scope.bookingTimes.length; i++){
            for (var j = 0; j < $scope.employeeData.length; j++) {
                var employeeInfo = {
                    bookingTime:$scope.bookingTimes[i],
                    employeeId:$scope.employeeData[j]._id,
                    reservationStatus:"Varaa"
                }
                //var employeeTmp = new 
            }
            
            
        }
        
        
        
    }*/
    

});