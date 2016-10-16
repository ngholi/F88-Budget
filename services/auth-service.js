var util = require('util');
var db = require('../models/index');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt-nodejs');
var registerCriteria = require('./validation-criteria').registerCriteria;

var User = db.User;
var Department = db.Department;


var authService = {};



authService.checkLoginCredentials = function(req, callback){
	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
	req.checkBody('password', 'Invalid password').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		callback(null, util.inspect(errors));
	}else{
		User.findOne({
			where: {
				email: req.body.email,
			}
		}).then(function(user){
			if(!user){
				callback(null, 'Invalid email');
			}
			else{
				bcrypt.compare(req.body.password, user.password, function(err, result) {
				    if(!err && result){
				    	callback(user, null);
				    }else{
				    	callback(null, 'Password mismatched');
				    }
				});
				
			}
		}).catch(function(err){
			callback(null, err);
		})
	}	
}

authService.register = function(req, callback){
	req.checkBody(registerCriteria);

	var errors = req.validationErrors();
	if (errors) {	
		callback(null, util.inspect(errors));
	}else{
		req.body.hashedId = uuid.v4();
		req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
		User.create(req.body)
		.then(function(user){
			if(!user){
				callback(null, 'Invalid credentials');
			}
			else
				callback(user, null);
		})
		.catch(function(err){
			callback(null, err);
		})
	}	
}

module.exports = authService;