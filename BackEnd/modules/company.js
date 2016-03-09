/**
 *This file is a router for Company resourse
 *Version:0.0.1
 *Author:Timo Parviainen
 *Description:Cteated this new file
 */

var query = require('./queries');

var express = require("express");

var router = express.Router();

/**
 * Handle GET requets for /companies context
 */
router.get('/',function(req,res){
    console.log('Handle GET requets for /companies context');
    query.getCompanyInformation(req,res);
});

/**
 * Handle POST requets for /companies context
 */
router.post('/',function(req,res){
    console.log('Handle POST requets for /companies context');
    query.saveNewCompany(req,res);
});

module.exports = router;
