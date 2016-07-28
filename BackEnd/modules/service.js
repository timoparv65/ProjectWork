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
    console.log('Handle POST requets for /services context');
    //query.saveNewService(req,res);
    query.saveNewService2(req,res);
});

/**
 * Handle GET requets for /services context
 */
router.get('/',function(req,res){
    console.log('Handle GET requets for /services context');
    query.getServicesByEmployeeName(req,res);
});

/**
 * Handle PUT requets for /services context
 */
router.put('/',function(req,res){
    console.log('Handle PUT requets for /services context');
    query.updateService(req,res);
});

/**
 * Handle DELETE requets for /services context
 */
router.delete('/',function(req,res){
    console.log('Handle DELETE requets for /services context');
    query.deleteService(req,res);
});

module.exports = router;
