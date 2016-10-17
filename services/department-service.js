var util = require('util');
var db = require('../models/index');
var Department = db.Department;
var validationRules = require('./validation-rules');
var addDepartmentRules = validationRules.addDepartmentRules;

var departmentService = {};

departmentService.addDepartment = function(req){
	return new Promise(function(fulfill,reject){
		req.checkBody(addDepartmentRules);

		var errors = req.validationErrors();

		if(errors){
			reject(util.inspect(errors));
		}else{
			Department.create(req.body)
			.then(function(department){
				if(!department)
					reject('Invalid info');
				else
					fulfill(department);
			})
			.catch(function(err){
				reject(err);
			})
		}
	})
	
}

module.exports = departmentService;