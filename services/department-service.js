var util = require('util');
var db = require('../models/index');
var Department = db.Department;
var validationRules = require('./validation-rules');
var addDepartmentRules = validationRules.addDepartmentRules;

var departmentService = {};

departmentService.addDepartment = function(req, callback){
	req.checkBody(addDepartmentRules);

	var errors = req.validationErrors();

	if(errors){
		callback(null, util.inspect(errors));
	}else{
		Department.create(req.body)
		.then(function(department){
			if(!department)
				callback(null, 'Invalid info');
			else
				callback(department, null);
		})
		.catch(function(err){
			callback(null, err);
		})
	}
}

module.exports = departmentService;