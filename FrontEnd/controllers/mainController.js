main_module.controller('mainController',function($scope,companyDataFactory){
    
    console.log('mainController loaded');
    
    $scope.selectedDate = null;
    console.log("$scope.selectedDate(1)");
    console.log($scope.selectedDate);
    
    companyDataFactory.getCompanyInformation(dataCallback);
    
    
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
                                        },
                                        dateFormat: "yy-mm-dd",
                                        beforeShowDay: $.datepicker.noWeekends,
                                        altField: "#actualDate"
                                    },
                                    $.datepicker.regional[ "fi" ]
        );


        var my_address = "Kiviharjunlenkki 1, Oulu";
        //console.log(my_address);
        //var my_address2 = $scope.companyData.name;
        //console.log("my_address2: " + my_address2);

        var geocoder = new google.maps.Geocoder();

        // kts. GeocoderRequest object specification
        var geoCodeRequest = {
            address:my_address
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
                    title:"Olemme täällä"
                });


            }else{

                alert(status);
            }

        });

    });

    
    function dataCallback(dataArray){
    
        console.log('mainController/dataCallback');
        console.log("dataArray[0]");
        console.log(dataArray[0]);
    
        $scope.companyData = dataArray[0];
        
    }

});