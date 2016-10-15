var express = require('express');
var router = express.Router();
var db = require('../models/index');

var User = db.User;
var Department = db.Department;



/* GET home page. */
router.get('/', function(req, res, next) {
	 Department.findAll({
	 	include:[User]
	 }).then(function(dpms){
	 	res.json({departments:dpms});
	 })	
});

module.exports = router;
