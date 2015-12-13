/**
 *This file is a router for Employee resourse
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
router.post('/register',function(req,res){
    
    query.registerEmployee(req,res);
});

/**
 *
 */
router.get('/',function(req,res){
   
    query.getReservationsByEmployeeName(req,res);
});
