var express = require('express');
var router = express.Router();
var departmentService = require('../services/department-service');

router.post('/create', function(req, res) {
  departmentService.addDepartment(req, function(department, errMessage){
  	if(department){
		res.status(200).json({department:department});
	}else{
		res.status(400).json({message:errMessage});
	}
  })
});

module.exports = router;