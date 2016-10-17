var express = require('express');
var router = express.Router();

var authService = require('../services/auth-service');

router.post('/create', function(req, res) {
  authService.register(req)
  .then(function(user){
  	res.status(200).json({user:user});
  }, function(message){
  	res.status(400).json({message:message});
  })
});




module.exports = router;
