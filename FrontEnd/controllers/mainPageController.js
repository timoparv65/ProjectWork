main_module.controller('mainPageController',function($scope,companyDataFactory){
    
    console.log('mainPageController loaded');
    
    /*
    $scope.navbarCustomerData = {
        
        urls:['/'],
        texts:['Etusivu'],
        classes:['active']
    }*/
    
    $scope.navbarData = {
        
        urls:['#/','#/ajanvaraus'],
        texts:['Etusivu','Ajanvaraus'],
        classes:['active','']
    }
    
    $scope.companyData = [];
    
    companyDataFactory.getCompanyInformation(dataCallbackCompany);
    
    function dataCallbackCompany(dataArray){
    
        console.log('mainPageController/dataCallbackCompany');
        //console.log("dataArray[0]");
        //console.log(dataArray[0]);
    
        $scope.companyData = dataArray;


        var geocoder = new google.maps.Geocoder();

        // kts. GeocoderRequest object specification
        var geoCodeRequest = {
            //address:my_address
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
