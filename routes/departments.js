var express = require('express');
var router = express.Router();
var departmentService = require('../services/department-service');

router.get('/all', function(req, res) {
  departmentService.getDepartments()
  .then(function(departments){
  	res.status(200).json({departments:departments});
  }, function(message){
  	res.status(400).json({message:message});
  })
});

router.post('/create', function(req, res) {
  departmentService.addDepartment(req)
  .then(function(department){
  	res.status(200).json({department:department});
  }, function(message){
  	res.status(400).json({message:message});
  })
});

router.post('/edit', function(req, res){
	departmentService.editDepartment(req)
	.then(function(department){
		res.status(200).json({department: department});
	}, function(message){
		res.status(400).json({message: message});
	})
});

router.delete('/delete', function(req, res){
	departmentService.deleteDepartment(req)
	.then(function(affectedRow){
		res.status(200).json({affectedRow: affectedRow});
	}, function(message){
		res.status(400).json({message: message});
	})
});

module.exports = router;