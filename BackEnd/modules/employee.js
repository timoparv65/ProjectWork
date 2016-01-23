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
 * Handle POST requets for /employees/register context
 */
router.post('/register',function(req,res){
    
    query.registerEmployee(req,res);
});

/**
 * Handle POST requets for /employees/login context
 */
router.post('/login',function(req,res){
   
    query.loginEmployee(req,res);
});

/**
 * Handle GET requets for /employees context
 */
router.get('/',function(req,res){
   
    query.getAllEmployees(req,res);
});

/**
 * Handle POST requets for /employees context
 */
router.post('/',function(req,res){
    
    query.saveNewEmployee(req,res);
});

/**
 * Handle DELETE requets for /employees context
 */
router.delete('/',function(req,res){
    
    query.deleteEmployee(req,res);
});

module.exports = router;
