var express = require('express');
var router = express.Router();
var db = require('../models/index');

var User = db.User;
var Department = db.Department;



/* GET home page. */
router.get('/', function(req, res, next) {
	 User.findAll({
	 	include:[Department]
	 }).then(function(users){
	 	res.json({users:users});
	 })	
});

module.exports = router;
