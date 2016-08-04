/**
 *This file is a router for Reservation resourse
 *Version:0.0.1
 *Author:Timo Parviainen
 *Description:Created this new file
 */

var query = require('./queries');

var express = require("express");

var router = express.Router();

/**
 * Handle POST requets for /reservations context
 */
router.post('/',function(req,res){
    console.log('Handle POST requets for /reservations context');
    query.saveNewReservation(req,res);
});

module.exports = router;