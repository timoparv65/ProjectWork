/**
 *This file is a router for Customer resourse
 *Version:0.0.1
 *Author:Timo Parviainen
 *Description:Cteated this new file
 */

var query = require('./queries');

var express = require("express");

var router = express.Router();

/**
 *
 */
router.get('/',function(req,res){

    query.getReservationsByCustomerName(req,res);
});

/**
 *
 */
router.post('/login',function(req,res){
   
    query.loginCustomer(req,res);
});

/**
 *
 */
router.post('/register',function(req,res){
   
    query.registerCustomer(req,res);
});



module.exports = router;