var util = require('util');
var bcrypt = require('bcrypt-nodejs');
var db = require('../models/index');

var validationRules = require('./validation-rules');
var editUserRules = validationRules.editUserRules;
var selfEditRules = validationRules.selfEditRules;
var changePasswordRules = validationRules.changePasswordRules;

var User = db.User;
var Department = db.Department;

var userService = {};

userService.editUser = function(req){
	return new Promise(function(fulfill,reject){
		req.checkBody(editUserRules);
		var errors = req.validationErrors();
		if(errors){
			reject(util.inspect(errors));
		}else{
			User.findById(req.body.userId)
			.then(function(user){
				if(!user)
					reject('Invalid user');
				else{
					user.updateAttributes({
						name: req.body.name,
						email: req.body.email,
						departmentId: req.body.departmentId
					})
					.then(function(user){
						fulfill(user);
					},function(err){
						reject(err);
					})
				}
			})
			.catch(function(err){
				reject(err);
			})
		}
	})
}

userService.deleteUser = function(req){
	return new Promise(function(fulfill, reject){
		if(!req.body.userId)
			reject('Invalid user');
		else{
			User.destroy({
				where: {
					'id': req.body.userId
				}
			})
			.then(function(affectedRows){
				fulfill(affectedRows);
			})
			.catch(function(err){
				reject(err);
			})
		}
	})
}

userService.editSelf = function(req){
	return new Promise(function(fulfill, reject){
			console.log('IN HERE');
			req.checkBody(selfEditRules);
			var errors = req.validationErrors();
			console.log(errors);
			if(errors){
				console.log('err validate');
				reject(util.inspect(errors));
			}
			else{
				console.log('no validation err');
				console.log(req.payload.id);
				User.findById(req.payload.id)
				.then(function(user){
					if(!user)
						reject('Invalid user');
					else{
						console.log(user);
						user.updateAttributes({
							name: req.body.name,
							phoneNumber: req.body.phoneNumber
						})
						.then(function(user){
							fulfill(user);
						},function(err){
							console.log('err');
							reject(err);
						})
					}
				})
				.catch(function(err){
					console.log(err);
					reject(err);
				})
			}	
		
	})
}

userService.changePassword = function(req){
	return new Promise(function(fulfill,reject){
		req.checkBody(changePasswordRules);
		var errors = req.validationErrors();
		if(errors)
			reject(util.inspect(errors));
		else{
			User.findById(req.payload.id)
			.then(function(user){

				bcrypt.compare(req.body.oldPassword, user.password, function(err, result){
					if(!err && result){
						user.updateAttributes({
							password: bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync())
						})
						.then(function(user){
							fulfill(user);
						}, function(err){
							reject(err);
						})
					}else if(!result){
						reject('Password mismatched');
					}else
						reject(err);
				})
			})
			.catch(function(err){
				reject(err);
			})
		}
	})
}

module.exports = userService;