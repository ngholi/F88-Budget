var express = require('express');
var router = express.Router();
var db = require('../models/index');

var User = db.User;
var Department = db.Department;



/* GET home page. */
router.get('/u', function(req, res, next) {
	 User.findAll({
	 	include:[{model: Department, as: 'department'}]
	 }).then(function(users){
	 	res.json({users:users});
	 })	
});

router.get('/d', function(req, res, next) {
	 Department.findAll({
	 	include:[
	 		{model: User, as: 'manager'},
	 		{model: Department, as: 'parentDepartment'}
	 	]
	 }).then(function(departments){
	 	res.json({departments:departments});
	 })	
});

module.exports = router;
