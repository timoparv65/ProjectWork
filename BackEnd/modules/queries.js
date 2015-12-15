/**
 *This file gives query services
 *Version:0.0.1
 *Author:Timo Parviainen
 *Description:Cteated this new file
 */

var db = require('./database');

/**
 *
 */
exports.getReservationsByCustomerName = function(req,res){
    console.log('queries/getReservationsByCustomerName')
}

/**
 *
 */
exports.loginCustomer = function(req,res){
    console.log('queries/loginCustomer');
}

/**
 *
 */
exports.registerCustomer = function(req,res){
    console.log('queries/registerCustomer');
}

/**
 *
 */
exports.registerEmployee = function(req,res){
    console.log('queries/registerEmployee');
}

/**
 *
 */
exports.loginEmployee = function(req,res){
    console.log('queries/loginEmployee');
}

/**
 *
 */
exports.getReservationsByEmployeeName = function(req,res){
    console.log('queries/getReservationsByEmployeeName');
}
