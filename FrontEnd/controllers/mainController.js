main_module.controller('mainController',function($scope,companyDataFactory,employeeDataFactory){
    
    console.log('mainController loaded');
    
    $scope.employeeData = [];
    $scope.companyData = [];
    $scope.bookingTimes = [];
    
    $scope.selectedDate = null;
    console.log("$scope.selectedDate(1)");
    console.log($scope.selectedDate);
    
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
                                            console.log("$scope.selectedDate(2)");
                                            console.log($scope.selectedDate);
                                     
                                            var dateAsString = dateText; //the first parameter of this function
                                            var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
                                            console.log("dateAsString: " + dateAsString);
                                            console.log("dateAsObject");
                                            console.log(dateAsObject);
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

        //var my_address = $scope.companyData.address;
        //console.log("my_address: " + my_address);

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

        var step = 60 / $scope.companyData[0].timeRaster;
        console.log("step: " + step);
        /*
        for (i=0; i < 10; i += step){
            console.log(i);
        }*/
        
        var stoppi = true;
        var tmp = 0;
        do{
            console.log(tmp);
            console.log(stoppi);
            tmp += step;
            console.log(tmp);
            if (tmp > 27){
                stoppi = false;
            }
            console.log(stoppi);
        }while(stoppi);
        
        var montako = ($scope.companyData[0].closingTime - $scope.companyData[0].openingTime) * step + 1;
        console.log("montako: " + montako);
        
        var tmp2 = 0;
        var aika = $scope.companyData[0].openingTime;
        var tunnit = "";
        var minuutit = 
        do{
            if(aika < 10){
                aikaleima = "0" + aika.toString();
            }
        }while(stoppi);
        
    }
    
    
    function data2Callback(dataArray){
    
        console.log('mainController/data2Callback');
        console.log(dataArray);
    
        $scope.employeeData = dataArray;
        
        //console.log("$scope.companyData[0]");
        //console.log($scope.companyData[0]);
    }
    
    /*
    $scope.klikattuSolua = function($event){
        console.log("mainController/klikattuSolua");
        
    }*/
    

});