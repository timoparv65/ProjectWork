main_module.controller('mainController',function($scope){
    
    console.log('mainController loaded');
    
    $scope.selectedDate = null;
    console.log($scope.selectedDate);
    
    $(document).ready(function(){
                $("#datepicker").datepicker(
                                            {   onSelect: function(dateText, inst) {
                                                    var date = $(this).val();
                                                    //var time = $('#time').val();
                                                    //alert('on select triggered');
                                                    //$("#start").val(date + time.toString(' HH:mm').toString());
                                                    //$("#start").val(date + time.toString(' HH:mm'));
                                                    //console.log(date + time.toString(' HH:mm').toString());
                                                    $scope.selectedDate = date;
                                                    console.log($scope.selectedDate);
                                                },
                                                dateFormat: "yy-mm-dd",
                                                beforeShowDay: $.datepicker.noWeekends,
                                                altField: "#actualDate"
                                            },
                                            $.datepicker.regional[ "fi" ]
                );
               
    });
    
});