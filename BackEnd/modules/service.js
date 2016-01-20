/**
 *This file is a router for Service resourse
 *Version:0.0.2
 *Author:Timo Parviainen
 *Description:Created this new file
 */

var query = require('./queries');

var express = require("express");

var router = express.Router();

/**
 * Handle POST requets for /services context
 */
router.post('/',function(req,res){
    
    query.saveNewService(req,res);
});

/**
 * Handle GET requets for /services context
 */
router.get('/',function(req,res){
    console.log('router for GET requets for /services context');
    query.getServicesByEmployeeName(req,res);
});

module.exports = router;
