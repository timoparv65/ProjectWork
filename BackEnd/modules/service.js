/**
 *This file is a router for Service resourse
 *Version:0.0.1
 *Author:Timo Parviainen
 *Description:Cteated this new file
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

module.exports = router;
