var express = require('express');
var router = express.Router();
var departmentService = require('../services/department-service');

router.post('/create', function(req, res) {
  departmentService.addDepartment(req)
  .then(function(department){
  	res.status(200).json({department:department});
  }, function(message){
  	res.status(400).json({message:message});
  })
});

module.exports = router;