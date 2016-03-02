main_module.controller('mainController',function($scope){
    
    console.log('mainController loaded');
    
    /*
    $(document).ready(function(){
                $("#datepicker").datepicker({
                    onSelect: function(dateText, inst) {
                        var date = $(this).val();
                        var time = $('#time').val();
                        alert('on select triggered');
                        $("#start").val(date + time.toString(' HH:mm').toString());
                        console.log(date + time.toString(' HH:mm').toString());
                    }
                });

    });*/
    
    $(document).ready(function(){
                $("#datepicker").datepicker(//$.datepicker.regional[ "fi" ],
                                            {   onSelect: function(dateText, inst) {
                                                    var date = $(this).val();
                                                    var time = $('#time').val();
                                                    alert('on select triggered');
                                                    $("#start").val(date + time.toString(' HH:mm').toString());
                                                    console.log(date + time.toString(' HH:mm').toString());
                                                },
                                             dateFormat: "yy-mm-dd",
                                             beforeShowDay: $.datepicker.noWeekends,
                                             nextText: "Later",
                                             altField: "#actualDate"
                                            },
                $.datepicker.regional[ "fi" ]
                );
               
            });
    
});