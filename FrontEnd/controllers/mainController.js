main_module.controller('mainController',function($scope,companyDataFactory,employeeDataFactory){
    
    console.log('mainController loaded');
    
    $scope.employeeData = [];
    $scope.companyData = [];
    $scope.bookingTimes = [];
    
    $scope.selectedDate = null;

    
    companyDataFactory.getCompanyInformation(dataCallback);
    
    employeeDataFactory.getEmployees(data2Callback);
    
    $(document).ready(function(){
        
        console.log("mainController/$(document).ready");

        $("#datepicker").datepicker(
                                    {   onSelect: function(dateText, inst) {
                                            var date = $(this).val();
                                            //var time = $('#time').val();
                                            //alert('on select triggered');
                                            //$("#start").val(date + time.toString(' HH:mm').toString());
                                            //$("#start").val(date + time.toString(' HH:mm'));
                                            //console.log(date + time.toString(' HH:mm').toString());
                                            $scope.selectedDate = date;
                                            //console.log("$scope.selectedDate(2)");
                                            //console.log($scope.selectedDate);
                                     
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

    
    function dataCallback(dataArray){
    
        console.log('mainController/dataCallback');
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
        
        var aikaraster_min = $scope.companyData[0].timeRaster.split(":")[1];
        console.log("aikaraster_min: " + aikaraster_min);
        //uusiAika("10:00","00:15");
        //uusiAika("23:55","00:15");
        uusiAika("00:50","00:20");
        createBookingTimes();
    }
    
    
    function data2Callback(dataArray){
    
        console.log('mainController/data2Callback');
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
    }
    
    function tulostan2DatepickerArvon(arvo){
        console.log('mainController/tulostan2DatepickerArvon');
        console.log("arvo: " + arvo);
    }
    
    function uusiAika(alkuaika,lisattavaaika){
        console.log("mainController/uusiAika");
        var alkuaika_tunnit = parseInt(alkuaika.split(":")[0]);
        var alkuaika_minuutit = parseInt(alkuaika.split(":")[1]);
        var lisattavaaika_tunnit = parseInt(lisattavaaika.split(":")[0]);
        var lisattavaaika_minuutit = parseInt(lisattavaaika.split(":")[1]);
        
        console.log("alkuaika_tunnit: " + alkuaika_tunnit);
        console.log("alkuaika_minuutit: " + alkuaika_minuutit);
        console.log("lisattavaaika_tunnit: " + lisattavaaika_tunnit);
        console.log("lisattavaaika_minuutit: " + lisattavaaika_minuutit);
        
        var uusiaika_tunnit = alkuaika_tunnit + lisattavaaika_tunnit;
        console.log("(1) uusiaika_tunnit: " + uusiaika_tunnit);
        var uusiaika_minuutit = alkuaika_minuutit + lisattavaaika_minuutit;
        console.log("(1) uusiaika_minuutit: " + uusiaika_minuutit);
        if (uusiaika_minuutit > 59){
            uusiaika_tunnit += 1;
            uusiaika_minuutit -= 60;
        }
    
        if (uusiaika_tunnit > 23){
            uusiaika_tunnit = 0;
        }
        
        console.log("(2) uusiaika_tunnit: " + uusiaika_tunnit);
        console.log("(2) uusiaika_minuutit: " + uusiaika_minuutit);
        
        var uusiaika = "";
        if (uusiaika_tunnit < 10){
            uusiaika += "0";
        }
        uusiaika += uusiaika_tunnit.toString() + ":";
        if(uusiaika_minuutit < 10){
            uusiaika += "0";
        }
        uusiaika += uusiaika_minuutit.toString();
        console.log("uusiaika: " + uusiaika);
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
        
        console.log("$scope.bookingTimes");
        console.log($scope.bookingTimes);
    }
    
    

});