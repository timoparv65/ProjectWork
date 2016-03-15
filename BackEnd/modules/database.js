/**
 *This file is database model for the barbershop-hairdresser company
 *Version:0.0.3
 *Author:Timo Parviainen
 *Description: Modified Company and Employee database models, added ofDate
 *             database model
 */

var mongoose = require("mongoose");
var db_name = "parturikampaamo";

var mongodb_connection_string = 'mongodb://localhost:27017/' + db_name;

exports.connect = function(callback){
	var dbconn = mongoose.connect(mongodb_connection_string,function(err,ok){

		if(err){

			console.log(err.message);
		}else{
			callback(dbconn);
		}
	})
}


var Company = mongoose.model('Company',{
    name:String,
    address:String,
    postalCode:Number,
    city:String,
    country:{type:String, default:'Finland'},
    phoneNumber:String,
    openingTime:{type:Number, default:8},
    closingTime:{type:Number, default:20},
    timeRaster:{type:Number, default:15} // aikarasterin oletusarvo on 15 minuuttia
},'company');


var RegisterButtonState = mongoose.model('RegisterButtonState',{
    buttonActive:{type:Boolean, default: true}
});

var Employee = mongoose.model('Employee',{
    name:String,
    password:String,
    email:{type:String,unique:true},
    role:String,
    picture:String,
    ofDates:[{type:mongoose.Schema.Types.ObjectId,ref:'ofDate'}], // milloin on poissa töistä
    services:[{type:mongoose.Schema.Types.ObjectId,ref:'Service'}], // mitä töitä tekee
    assignments:[{type:mongoose.Schema.Types.ObjectId,ref:'Reservation'}], // varaukset
    company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'}
},'employee');


var Reservation = mongoose.model('Reservation',{
    date:Date,
    startingTime:String,
    finnishTime:String,
    employee:{type:mongoose.Schema.Types.ObjectId,ref:'Employee'},
    customer:{type:mongoose.Schema.Types.ObjectId,ref:'Customer'}
},'reservation');

var Customer = mongoose.model('Customer',{
    name:String,
    password:String,
    email:{type:String,unique:true},
    mobileNumber:{type:String,unique:true},
    assignments:[{type:mongoose.Schema.Types.ObjectId,ref:'Reservation'}] // varaukset
},'customer');


var GenerateOpeningHoursTableInfo = mongoose.model('GenerateOpeningHoursTableInfo',{
    openingTime:String,
    closingTime:String,
    timeRaster:{type:Number, default:15} // aikarasterin oletusarvo on 15 minuuttia
},'generateopeninghourstableinfo');

var Service = mongoose.model('Service',{
    category:String,
    description:String,
    duration:Number,
    code:Number
},'service');

var ServiceChoise = mongoose.model('ServiceChoise',{
    category:String,
    description:{type:String,unique:true},
    duration:{type:Number,min:0,max:180}, // minimiaika 0 min, maksimiaika 3 tuntia
    code:{type:Number,unique:true}
});

var ofDate = mongoose.model('ofDate',{
    startingTime:Date,
    finnishTime:Date
},'ofDate');

//Using exports object you expose the data to other modules
exports.Employee = Employee;
exports.Reservation = Reservation;
exports.Customer = Customer;
//exports.GenerateOpeningHoursTableInfo = GenerateOpeningHoursTableInfo;
exports.RegisterButtonState = RegisterButtonState;
exports.Service = Service;
exports.ServiceChoise = ServiceChoise;
exports.Company = Company;
exports.ofDate = ofDate;
