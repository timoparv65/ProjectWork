/**
 *This file is a router for Service Choise resourse
 *Version:0.0.1
 *Author:Timo Parviainen
 *Description:Created this new file
 */

var query = require('./queries');

var express = require("express");

var router = express.Router();

/**
 * Handle POST requets for /servicechoises context
 */
router.post('/',function(req,res){
    console.log('Handle POST requets for /serviceChoises context');
    query.saveNewServiceChoise(req,res);
});

/**
 * Handle GET requets for /servicechoises context
 */
router.get('/',function(req,res){
    console.log('Handle GET requets for /servicechoises context');
    query.getAllServiceChoises(req,res);
});

/**
 * Handle PUT requets for /servicechoises context
 */
router.put('/',function(req,res){
    console.log('Handle PUT requets for /serviceChoises context');
    query.updateServiceChoise(req,res);
});

/**
 * Handle DELETE requets for /servicechoises context
 */
router.delete('/',function(req,res){
    console.log('Handle DELETE requets for /serviceChoises context');
    query.deleteServiceChoise(req,res);
});

module.exports = router;
