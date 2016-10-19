var util = require('util');
var db = require('../models/index');
var Department = db.Department;
var validationRules = require('./validation-rules');
var addDepartmentRules = validationRules.addDepartmentRules;
var editDepartmentRules = validationRules.editDepartmentRules;

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

departmentService.getDepartments = function(){
	return new Promise(function(fulfill,reject){
		Department.findAll()
		.then(function(departments){
			fulfill(departments);
		})
		.catch(function(err){
			reject(err);
		})
	})
}

departmentService.editDepartment = function(req){
	return new Promise(function(fulfill,reject){
		req.checkBody(editDepartmentRules);

		var errors = req.validationErrors();

		if(errors){
			reject(util.inspect(errors));
		}else{
			Department.findById(req.body.departmentId)
			.then(function(department){
				department.updateAttributes({
			        name: req.body.name,
			        parentDepartmentId: req.body.parentDepartmentId,
			        managerId: req.body.managerId
			      })
			      .then(function(department){
			      	fulfill(department);
			      }, function(err){
			      	reject(err);
			      })
			})
			.catch(function(err){
				reject(err);
			})
		}
		
	})
}

departmentService.deleteDepartment = function(req){
	return new Promise(function(fulfill,reject){
		if(!req.body.departmentId){
			reject('Invalid department');
		}else{
			Department.destroy({
				where: {
					'id': req.body.departmentId
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

module.exports = departmentService;