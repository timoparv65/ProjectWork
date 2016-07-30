main_module.controller('mainPageController',function($scope,companyDataFactory){
    
    console.log('mainPageController loaded');
    
    /*
    $scope.navbarCustomerData = {
        
        urls:['#/','#/ajanvaraus','#/sisaisille_sivuille'],
        texts:['Etusivu','Ajanvaraus','Yrityksen sisäisille sivuille'],
        classes:['active','','']
    }*/
    
    $scope.navbarData = {
        
        urls:['#/','#/palvelun_valinta','#/sisaisille_sivuille'],
        texts:['Etusivu','Palvelun valinta','Yrityksen sisäisille sivuille'],
        classes:['active','','']
    }
    
    $scope.companyData = [];
    
    companyDataFactory.getInformation(dataCallbackCompany);
    
    function dataCallbackCompany(dataArray){
    
        console.log('mainPageController/dataCallbackCompany');
        //console.log("dataArray[0]");
        //console.log(dataArray[0]);
    
        $scope.companyData = dataArray;


        var geocoder = new google.maps.Geocoder();

        // kts. GeocoderRequest object specification
        var geoCodeRequest = {
            address:$scope.companyData[0].address + "," + $scope.companyData[0].city
        }

        geocoder.geocode(geoCodeRequest,function(response,status){

            if(status === google.maps.GeocoderStatus.OK){

                //console.log("response");
                //console.log(response);
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
        
    }

});
