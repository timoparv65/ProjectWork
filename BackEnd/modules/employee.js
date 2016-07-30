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
    console.log('Handle POST requets for /employees/register context');
    query.registerEmployee(req,res);
});

/**
 * Handle POST requets for /employees/login context
 */
router.post('/login',function(req,res){
    console.log('Handle POST requets for /employees/login context');
    query.loginEmployee(req,res);
});

/**
 * Handle POST requets for /employees/admin_login context
 */
router.post('/admin_login',function(req,res){
    console.log('Handle POST requets for /employees/admin_login context');
    query.loginAdminEmployee(req,res);
});

/**
 * Handle POST requets for /employees/service context
 */
router.get('/service',function(req,res){
    console.log('Handle GET requets for /employees/service context');
    query.getEmployeesByService(req,res);
});

/**
 * Handle POST requets for /employees/single context
 * => 29.7.2016
 */
router.get('/single',function(req,res){
    console.log('Handle GET requets for /employees/single context');
    query.getSingleEmployee(req,res);
});

/**
 * Handle GET requets for /employees context
 */
router.get('/',function(req,res){
    console.log('Handle GET requets for /employees context');
    query.getAllEmployees(req,res);
});

/**
 * Handle POST requets for /employees context
 */
router.post('/',function(req,res){
    console.log('Handle POST requets for /employees context');
    query.saveNewEmployee(req,res);
});

/**
 * Handle PUT requets for /employees context
 */
router.put('/',function(req,res){
    console.log('Handle PUT requets for /employees context');
    query.updateEmployee(req,res);
});

/**
 * Handle DELETE requets for /employees context
 */
router.delete('/',function(req,res){
    console.log('Handle DELETE requets for /employees context');
    query.deleteEmployee(req,res);
});

module.exports = router;
