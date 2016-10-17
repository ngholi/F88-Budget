var util = require('util');
var db = require('../models/index');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt-nodejs');
//var Promise = require('promise');

var validationRules = require('./validation-rules');
var registerRules = validationRules.registerRules;
var loginRules = validationRules.loginRules;

var User = db.User;
var Department = db.Department;


var authService = {};


authService.checkLoginCredentials = function(req){
	return new Promise(function(fulfill, reject){
		req.checkBody(loginRules);
		var errors = req.validationErrors();
		if(errors){
			reject(util.inspect(errors));
		}else{
			User.findOne({
				where:{email: req.body.email}
			})
			.then(function(user){
				if(!user){
					reject('Invalid email');
				}else{
					bcrypt.compare(req.body.password, user.password, function(err, result){
						if(!err && result)
							fulfill(user);
						else
							reject('Password mismatched');
					})
				}						
			})
			.catch(function(err){
				reject(err);
			})
		}		
	})
}

authService.register = function(req, callback){
	return new Promise(function(fulfill, reject){
		req.checkBody(registerRules);
		var errors = req.validationErrors();

		if(errors){
			reject(util.inspect(errors));
		}else{
			req.body.hashedId = uuid.v4();
			req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
			User.create(req.body)
			.then(function(user){
				if(!user)
					reject('Invalid credentials');
				else
					fulfill(user);
			})
			.catch(function(err){
				reject(err);
			})
		}	
	})
}

module.exports = authService;