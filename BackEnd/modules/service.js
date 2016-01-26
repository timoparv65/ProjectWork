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
    console.log('service/POST requets for /services context');
    query.saveNewService(req,res);
});

/**
 * Handle GET requets for /services context
 */
router.get('/',function(req,res){
    console.log('service/GET requets for /services context');
    query.getServicesByEmployeeName(req,res);
});

/**
 * Handle PUT requets for /services context
 */
router.put('/',function(req,res){
    console.log('service/PUT requets for /services context');
    query.updateService(req,res);
});

/**
 * Handle DELETE requets for /services context
 */
router.delete('/',function(req,res){
    console.log('service/DELETE requets for /services context');
    query.deleteService(req,res);
});

module.exports = router;
