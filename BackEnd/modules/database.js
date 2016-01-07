/**
 *This file is database model for the barbershop-hairdresser company
 *Version:0.0.1
 *Author:Timo Parviainen
 *Description:Cteated this new file
 */

var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/parturikampaamo',connectionStatus);

/**
  *Connectuion callback for fail and ok cases
  */
function connectionStatus(err,ok){
    
    if(err){
        
        console.log(err.message);
    }else{
        
        console.log("We are connected!");
    }
}

var RegisterButtonState = mongoose.model('RegisterButtonState',{
    buttonActive:{type:Boolean, default: true}
});

var Employee = mongoose.model('Employee',{
    name:String,
    password:String,
    email:String,
    picture:String,
    ofDates:[Date], // milloin on poissa töistä
    services:[{type:mongoose.Schema.Types.ObjectId,ref:'Service'], // mitä töitä tekee
    assignments:[{type:mongoose.Schema.Types.ObjectId,ref:'Reservation'}] // varaukset
},'employee');


var Reservation = mongoose.model('Reservation',{
    date:Date,
    startingTime:String,
    finnishtime:String,
    employee:{type:mongoose.Schema.Types.ObjectId,ref:'Employee'},
    customer:{type:mongoose.Schema.Types.ObjectId,ref:'Customer'}
},'reservation');

var Customer = mongoose.model('Customer',{
    username:{type:String,unique:true},
    password:String,
    email:{type:String,unique:true},
    mobileNumber:{type:String,unique:true},
    assignments:[{type:mongoose.Schema.Types.ObjectId,ref:'Reservation'}] // varaukset
},'customer');


var GenerateOpeningHoursTableInfo = mongoose.model('GenerateOpeningHoursTableInfo',{
    openingHour:String,
    duration:{type:Number},
    timeRaster:{type:Number, default:15} // aikarasterin oletusarvo on 15 minuuttia
},'generateopeninghourstableinfo');

var Service = mongoose.model('Service',{
    category:String,
    description:String,
    timeInMinutes:Number,
    code:{type:String,unique:true}
},'service');

//Using exports object you expose the data to other modules
exports.Employee = Employee;
exports.Reservation = Reservation;
exports.Customer = Customer;
exports.GenerateOpeningHoursTableInfo = GenerateOpeningHoursTableInfo;
exports.RegisterButtonState = RegisterButtonState;
exports.Service = Service;
