var express = require('express');
var router = express.Router();

var authService = require('../services/auth-service');

router.post('/create', function(req, res) {
  authService.register(req, function(user, message){
		if(user){
			res.status(200).json({user:user});
		}else{
			res.status(400).json({message:message});
		}
	}) 
});


module.exports = router;
