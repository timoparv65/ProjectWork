$(document).ready(function(){
    
    console.log("my_location_script loaded");
	
    // luodaan käsittelijä getBtn-painikkeelle
    // kts: Geocoder class
    // => https:developers.google.com/maps/documentation/javascript/reference#Geocoder
    
    
    //$('#getBtn').click(function(){
        
        console.log("my_location_script/getBtn.click");
       
        //var my_address = $('#osoite').val();
        var my_address = "Kiviharjunlenkki 1, Oulu";
        console.log(my_address);
        
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
                    title:"Olet täällä"
                });

                
            }else{
                
                alert(status);
            }
            
        });
        
    //});
    
    
});