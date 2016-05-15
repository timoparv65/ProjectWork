main_module.controller('reservationSelectTimeController',function($scope,employeeDataFactory){
    
    console.log('reservationSelectTimeController loaded');
    
    $scope.navbarData = {
        
        urls:[''],
        texts:[''],
        classes:['']
    }
    
    console.log('employeeDataFactory.selectedEmployee');
    console.log(employeeDataFactory.selectedEmployee);
    
    $(document).ready(function(){
        
        console.log("reservationSelectTimeController/$(document).ready");

        $("#datepicker").datepicker(
                                    {   onSelect: function(dateText, inst) {
                                            var dateAsString = dateText;
                                            console.log("dateAsString: " + dateAsString);
                                            tulostanDatepickerArvon(dateAsString);
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
    
    function tulostanDatepickerArvon(arvo){
        console.log('reservationSelectTimeController/tulostanDatepickerArvon');
        
        console.log($scope.selectedDate);
    }
    
    
});
