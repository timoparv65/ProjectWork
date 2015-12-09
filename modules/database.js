var mongoose = require('mongoose');

var Customer = mongoose.model('Customer',{
    userName:{type:String, unique:true}, // käytännössä email-osoite
    password:String,
    phoneNumber:String,
    firstName:String,
    surname:String
});

var Employee = mongoose.model('Employee',{
    name:String
});

var DayOfWork = mongoose.model('DayOfWork',{
    openingHour: Time,
    closingHour: Time,
    
});

